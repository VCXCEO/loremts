export const schema = gql`
  type EmailMessageSent {
    id: Int!
    messageId: String!
    conversationId: String!
    extract: String!
    handleTime: Int!
    dateReceived: DateTime!
    email: Email!
    emailId: Int!
    emailConversationId: String!
  }

  type Query {
    emailMessageSents: [EmailMessageSent!]! @requireAuth
    emailMessageSent(id: Int!): EmailMessageSent @requireAuth
  }

  input CreateEmailMessageSentInput {
    messageId: String!
    conversationId: String!
    extract: String!
    handleTime: Int!
    dateReceived: DateTime!
    emailId: Int!
    emailConversationId: String!
  }

  input UpdateEmailMessageSentInput {
    messageId: String
    conversationId: String
    extract: String
    handleTime: Int
    dateReceived: DateTime
    emailId: Int
    emailConversationId: String
  }

  type Mutation {
    createEmailMessageSent(
      input: CreateEmailMessageSentInput!
    ): EmailMessageSent! @requireAuth
    updateEmailMessageSent(
      id: Int!
      input: UpdateEmailMessageSentInput!
    ): EmailMessageSent! @requireAuth
    deleteEmailMessageSent(id: Int!): EmailMessageSent! @requireAuth
  }
`
