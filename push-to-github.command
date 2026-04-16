#!/bin/bash
cd "$(dirname "$0")"
echo ""
echo "🚀 Pushing FNDI website to GitHub..."
echo ""
git add -A
git commit -m "Update FNDI site"
git push origin main
PUSH_STATUS=$?
echo ""
if [ $PUSH_STATUS -eq 0 ]; then
    echo "✅ SUCCESS! Your site is being deployed to Vercel now."
    echo "   It'll be live at fndi.tech in about 60 seconds."
else
    echo "❌ Push failed."
fi
echo ""
read -p "Press Enter to close..."
