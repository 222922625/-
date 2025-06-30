
export async function GET() {
  try {
    // GitHub API URL for repository contents
    const repoUrl = 'https://api.github.com/repos/222922625/-/contents';
    
    const response = await fetch(repoUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Next.js App'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter both files and directories (projects)
    const projects = data
      .map(item => {
        if (item.type === 'file') {
          return {
            name: item.name,
            path: item.path,
            url: item.html_url,
            download_url: item.download_url,
            size: item.size,
            type: item.name.split('.').pop(), // Get file extension
            itemType: 'file'
          };
        } else if (item.type === 'dir') {
          return {
            name: item.name,
            path: item.path,
            url: item.html_url,
            download_url: null,
            size: 0,
            type: 'folder',
            itemType: 'directory'
          };
        }
        return null;
      })
      .filter(item => item !== null);

    return Response.json({ projects });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return Response.json(
      { error: 'Failed to fetch GitHub repository data' },
      { status: 500 }
    );
  }
}