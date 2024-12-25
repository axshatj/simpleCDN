# Simple CDN Implementation with LRU Cache

This project is a basic implementation of a Content Delivery Network (CDN) for learning purposes. It includes an origin server, edge servers with LRU caching, a load balancer, and a client for testing.

## Project Structure

- `src/origin-server.js`: The origin server that holds the original content.
- `src/edge-server.js`: Edge server that caches content from the origin server using an LRU cache.
- `src/load-balancer.js`: Load balancer that distributes requests among edge servers.
- `src/client.js`: A simple client for testing the CDN.
- `src/lru-cache.js`: Implementation of the Least Recently Used (LRU) cache.

## Prerequisites

- Node.js (version 14 or higher recommended).
- npm (comes with Node.js).

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/axshatj/simpleCDN.git
   cd simpleCDN
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. **Start the Origin Server:**
   Run the origin server to serve the original content.
   ```bash
   node src/origin-server.js
   ```

2. **Start Edge Servers:**
   Start one or more edge servers to cache and serve content using the LRU cache.
   ```bash
   node src/edge-server.js --port=3001
   node src/edge-server.js --port=3002
   ```

3. **Start the Load Balancer:**
   The load balancer distributes incoming requests to the available edge servers.
   ```bash
   node src/load-balancer.js
   ```

4. **Test with the Client:**
   Use the client to send requests to the CDN.
   ```bash
   node src/client.js
   ```

## How It Works

1. **Client Requests**:
   The client sends a request to the load balancer.

2. **Load Balancer**:
   The load balancer forwards the request to one of the available edge servers.

3. **Edge Servers**:
   - If the requested content is cached (using the LRU cache), the edge server serves it directly.
   - If the content is not cached, the edge server fetches it from the origin server, caches it, and then serves it to the client.

4. **Origin Server**:
   The origin server provides the original content when requested by an edge server.

