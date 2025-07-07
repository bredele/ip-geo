# ip-geo

Infer a user’s location from their IP address.

## Installation

```sh
npm install ip-geo
```

## Usage

```ts
import location from 'ip-geo';

await location();
// { ip: '173.245.59.208', city: 'San Francisco', state: 'California', ... }
```
