import getIp from "ip-leak";

interface LocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
}

interface IpApiResponse {
  status: string;
  message?: string;
  query: string;
  city: string;
  regionName: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
}

interface FreeGeoIpResponse {
  ip: string;
  city: string;
  region_name: string;
  country_name: string;
  latitude: number;
  longitude: number;
  time_zone: string;
  isp?: string;
}

export default async (ip?: string): Promise<LocationData> => {
  ip = ip || (await getIp({ timeout: 5000 }));
  try {
    return await getLocationFromIpApi(ip);
  } catch (error) {
    return await getLocationFromFreeGeoIp(ip);
  }
};

const getLocationFromIpApi = async (ip: string): Promise<LocationData> => {
  const response = await fetch(`https://ip-api.com/json/${ip}`);
  if (!response.ok) {
    throw new Error(`ip-api.com request failed: ${response.status}`);
  }
  const data = (await response.json()) as IpApiResponse;
  if (data.status === "fail") {
    throw new Error(`ip-api.com error: ${data.message}`);
  }
  return {
    ip: data.query,
    city: data.city,
    region: data.regionName,
    country: data.country,
    lat: data.lat,
    lon: data.lon,
    timezone: data.timezone,
    isp: data.isp,
  };
};

const getLocationFromFreeGeoIp = async (ip: string): Promise<LocationData> => {
  const response = await fetch(`https://freegeoip.app/json/${ip}`);
  if (!response.ok) {
    throw new Error(`freegeoip.app request failed: ${response.status}`);
  }
  const data = (await response.json()) as FreeGeoIpResponse;
  return {
    ip: data.ip,
    city: data.city,
    region: data.region_name,
    country: data.country_name,
    lat: data.latitude,
    lon: data.longitude,
    timezone: data.time_zone,
    isp: data.isp || "Unknown",
  };
};
