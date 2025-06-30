import { Octokit } from 'octokit';
import { z } from 'zod';

// 创建Octokit实例
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const GITHUB_OWNER = process.env.GITHUB_OWNER || 'Faust-10086';
const GITHUB_REPO = process.env.GITHUB_REPO || 'Web-develop';

// 使用Zod定义仓库内容的类型
const RepoContentSchema = z.object({
  name: z.string(),
  path: z.string(),
  sha: z.string(),
  size: z.number(),
  url: z.string(),
  html_url: z.string(),
  git_url: z.string(),
  download_url: z.string().nullable(),
  type: z.string(),
  content: z.string().optional(),
  encoding: z.string().optional(),
});

const RepoContentsResponseSchema = z.array(RepoContentSchema);

/**
 * 获取GitHub仓库内容
 * @param {string} path - 仓库中的路径
 * @returns {Promise<Array>} - 返回仓库内容
*/
export async function getRepoContents(path = '') {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: path,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    // 验证响应数据
    const parsedData = Array.isArray(response.data)
      ? RepoContentsResponseSchema.parse(response.data)
      : RepoContentSchema.parse(response.data);

    return parsedData;
  } catch (error) {
    console.error('GITHUB_API_ERROR in getRepoContents:', error);
    throw new Error(`Failed to fetch GitHub repo contents: ${error.message}`);
  }
}

/**
 * 获取文件内容
 * @param {string} path - 文件路径
 * @returns {Promise<string>} - 返回文件内容
 */
export async function getFileContent(path) {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: path,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    // 验证响应数据
    const parsedData = RepoContentSchema.parse(response.data);

    // 如果是文件，返回解码后的内容
    if (parsedData.type === 'file' && parsedData.content) {
      return Buffer.from(parsedData.content, 'base64').toString('utf-8');
    }

    throw new Error('Not a file or no content available');
  } catch (error) {
    console.error('Error fetching file content:', error);
    throw new Error(`Failed to fetch file content: ${error.message}`);
  }
}

/**
 * 获取项目列表
 * @returns {Promise<Array>} - 返回项目列表
 */
export async function getProjects() {
  try {
    // 获取仓库根目录内容
    const contents = await getRepoContents('');

    // 过滤出目录，这些将作为项目
    const projects = contents
      .filter(item => item.type === 'dir')
      .map(dir => ({
        slug: dir.name,
        title: dir.name.replace(/-/g, ' '),
        path: dir.path,
        url: dir.html_url,
      }));

    return projects;
  } catch (error) {
    console.error('PROCESSING_ERROR in getProjects:', error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}

/**
 * 获取项目详情
 * @param {string} slug - 项目标识
 * @returns {Promise<Object>} - 返回项目详情
 */
export async function getProjectBySlug(slug) {
  try {
    // 首先检查项目是否存在
    const projects = await getProjects();
    const project = projects.find(p => p.slug === slug);

    if (!project) {
      return null; // 项目不存在
    }

    // 获取项目目录内容
    const contents = await getRepoContents(project.path);

    // 查找README.md文件
    const readmeFile = contents.find(item =>
      item.type === 'file' && item.name.toLowerCase() === 'readme.md'
    );

    // 如果有README.md，获取其内容
    let description = '';
    if (readmeFile) {
      description = await getFileContent(readmeFile.path);
    }

    // 查找图片文件
    const imageFile = contents.find(item =>
      item.type === 'file' && /\.(jpg|jpeg|png|gif|svg)$/i.test(item.name)
    );

    // 构建项目详情
    return {
      ...project,
      description,
      imageUrl: imageFile ? imageFile.download_url : '/next.svg', // 默认图片
      files: contents.filter(item => item.type === 'file').map(file => ({
        name: file.name,
        path: file.path,
        url: file.html_url,
        download_url: file.download_url,
      })),
    };
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    throw new Error(`Failed to fetch project details: ${error.message}`);
  }
}