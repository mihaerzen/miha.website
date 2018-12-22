// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateQuestCompletion = `subscription OnCreateQuestCompletion(
  $id: ID
  $quest_id: String
  $completion_time: Int
) {
  onCreateQuestCompletion(
    id: $id
    quest_id: $quest_id
    completion_time: $completion_time
  ) {
    id
    quest_id
    completion_time
  }
}
`;
export const onUpdateQuestCompletion = `subscription OnUpdateQuestCompletion(
  $id: ID
  $quest_id: String
  $completion_time: Int
) {
  onUpdateQuestCompletion(
    id: $id
    quest_id: $quest_id
    completion_time: $completion_time
  ) {
    id
    quest_id
    completion_time
  }
}
`;
export const onDeleteQuestCompletion = `subscription OnDeleteQuestCompletion(
  $id: ID
  $quest_id: String
  $completion_time: Int
) {
  onDeleteQuestCompletion(
    id: $id
    quest_id: $quest_id
    completion_time: $completion_time
  ) {
    id
    quest_id
    completion_time
  }
}
`;
