#!/usr/bin/env python3
"""
FinBot Local Development Server
Simple HTTP server to serve the FinBot Personal Finance Advisor Dashboard
"""
import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for smooth dev experience
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"==================================================")
        print(f"  FinBot Dashboard running at: http://localhost:{PORT}")
        print(f"  Serving files from: {DIRECTORY}")
        print(f"  Press Ctrl+C to terminate.")
        print(f"==================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down FinBot server.")
            httpd.shutdown()

if __name__ == '__main__':
    run_server()
