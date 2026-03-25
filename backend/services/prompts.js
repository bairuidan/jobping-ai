export const greetingPrompt = `你是一名资深招聘专家和用人经理。

请根据【岗位JD】和【候选人简历】，生成3-5条用于招聘平台“打招呼”的消息。

要求：
1. 强调匹配点（具体）
2. 优先写项目经验或成果
3. 避免空话
4. 每条不超过100字
5. 风格不同

输出JSON数组`;

export const suggestionPrompt = `你是一名资深HR。

请对比JD和简历，输出优化建议：
* before
* after
* reason

必须JSON格式`;

export const rewritePrompt = `输出一份优化后的完整简历：
* 结构清晰
* 强匹配JD
* 尽量量化成果`;

export function buildMessages(systemPrompt, jd, resume) {
  return [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: `岗位JD:\n${jd}\n\n候选人简历:\n${resume}`,
    },
  ];
}
