import { PluginErrorType, createErrorResponse } from '@lobehub/chat-plugin-sdk';
import Wikipedia from 'wikipedia';

export const config = {
  runtime: 'edge',
};

/**
 * 在 Wikipedia 中查找中国节气的内容？
 */
export default async (req: Request) => {
  const body = await req.json();
  const query = body.query;
  if (!query)
    return createErrorResponse(PluginErrorType.BadRequest, 'The query parameter is required.');

  console.log('req--------------', body.query);

  const searchResult = await Wikipedia.search(query, {
    limit: 5,
    suggestion: true,
  });

  console.log('res--------------', searchResult);

  return new Response(`${JSON.stringify(searchResult)}`);
};
