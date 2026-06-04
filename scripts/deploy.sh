#!/bin/bash
set -e

# 运行部署并捕获所有输出
DEPLOY_OUTPUT=$(npx wrangler pages deploy . --branch master --project-name snapprice 2>&1)
EXIT_CODE=$?

echo "=== WRANGLER OUTPUT ==="
echo "$DEPLOY_OUTPUT"
echo "=== EXIT CODE: $EXIT_CODE ==="

# 如果失败，尝试获取更多信息
if [ $EXIT_CODE -ne 0 ]; then
  echo "=== ACCOUNT CHECK ==="
  npx wrangler whoami 2>&1 || true
fi

exit $EXIT_CODE
