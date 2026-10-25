#!/usr/bin/env python3
"""
Direct Vercel Deployment Script
Deploys FinBot directly to Vercel via the official Vercel REST API
"""
import os
import sys
import json
import urllib.request
import urllib.error

TOKEN = os.environ.get("VERCEL_TOKEN")
if not TOKEN:
    if len(sys.argv) > 1:
        TOKEN = sys.argv[1].strip()

if not TOKEN:
    print("Error: VERCEL_TOKEN environment variable or command-line argument is required.")
    print("Usage: python3 deploy_vercel.py <YOUR_VERCEL_TOKEN>")
    print("Generate a token at: https://vercel.com/account/tokens")
    sys.exit(1)

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
FILES_TO_DEPLOY = ["index.html", "styles.css", "app.js", "vercel.json", "package.json", "README.md"]

payload_files = []
for fname in FILES_TO_DEPLOY:
    fpath = os.path.join(PROJECT_DIR, fname)
    if os.path.exists(fpath):
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        payload_files.append({
            "file": fname,
            "data": content
        })

payload = {
    "name": "finbot-ai-dashboard",
    "files": payload_files,
    "projectSettings": {
        "framework": None
    }
}

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

print(f"Deploying {len(payload_files)} files to Vercel...")
req = urllib.request.Request(
    "https://api.vercel.com/v13/deployments",
    data=json.dumps(payload).encode("utf-8"),
    headers=headers,
    method="POST"
)

try:
    with urllib.request.urlopen(req) as resp:
        res_data = json.loads(resp.read().decode("utf-8"))
        url = res_data.get("url")
        inspect_url = res_data.get("inspectorUrl")
        print("\n=======================================================")
        print("  🎉 DEPLOYMENT SUCCESSFUL!")
        print(f"  Live URL: https://{url}")
        if inspect_url:
            print(f"  Dashboard: {inspect_url}")
        print("=======================================================\n")
except urllib.error.HTTPError as e:
    err_body = e.read().decode("utf-8")
    print(f"Deployment failed ({e.code}): {err_body}")
    sys.exit(1)
except Exception as e:
    print(f"Error during deployment: {e}")
    sys.exit(1)
