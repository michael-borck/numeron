/**
 * Fetch the latest GitHub Release and populate download links.
 * Falls back gracefully if no release exists yet.
 */
const REPO = 'michael-borck/numeron';
const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

async function populateDownloads() {
  const note = document.getElementById('downloadNote');
  const dlWin = document.getElementById('dl-win');
  const dlMac = document.getElementById('dl-mac');
  const dlLinux = document.getElementById('dl-linux');

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('No release found');

    const release = await response.json();
    const assets = release.assets || [];
    const version = release.tag_name || 'unknown';

    let found = false;

    for (const asset of assets) {
      const name = asset.name.toLowerCase();
      const url = asset.browser_download_url;

      if (name.endsWith('.exe') || name.includes('win-setup')) {
        dlWin.href = url;
        dlWin.style.display = 'inline-block';
        found = true;
      } else if (name.endsWith('.dmg')) {
        dlMac.href = url;
        dlMac.style.display = 'inline-block';
        found = true;
      } else if (name.endsWith('.appimage')) {
        dlLinux.href = url;
        dlLinux.style.display = 'inline-block';
        found = true;
      }
    }

    if (found) {
      note.textContent = `${version} — Desktop app for Windows, macOS, and Linux.`;
    } else {
      note.textContent = `${version} — No desktop builds in this release. Use the web app.`;
    }
  } catch {
    note.textContent = 'Desktop app coming soon. Use the web app in the meantime.';
    // Show GitHub link as fallback — already present in HTML
  }
}

populateDownloads();
