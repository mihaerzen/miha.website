// eslint-disable
// this is an auto generated file. This will be overwritten

export const getQuestCompletion = `query GetQuestCompletion($id: ID!) {
  getQuestCompletion(id: $id) {
    id
    quest_id
    completion_time
  }
}
`;
export const listQuestCompletions = `query ListQuestCompletions(
  $filter: TableQuestCompletionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestCompletions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      quest_id
      completion_time
    }
    nextToken
  }
}
`;
export const queryQuestCompletionsByQuestIdIndex = `query QueryQuestCompletionsByQuestIdIndex(
  $quest_id: String!
  $first: Int
  $after: String
) {
  queryQuestCompletionsByQuestIdIndex(
    quest_id: $quest_id
    first: $first
    after: $after
  ) {
    items {
      id
      quest_id
      completion_time
    }
    nextToken
  }
}
`;
