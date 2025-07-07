# ip-geo

Infer a user’s location from their IP address.

## Installation

```sh
npm install @bredele/ip-geo
```

## Usage

```ts
import location from "@bredele/ip-geo";

await location();
// { ip: '173.245.59.208', city: 'San Francisco', state: 'California', ... }
```
