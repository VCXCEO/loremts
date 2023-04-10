export const schema = gql`
  type EmailMessageReceived {
    id: Int!
    messageId: String!
    conversationId: String!
    extract: String!
    handleTime: Int!
    dateReceived: DateTime!
    Email: Email
    emailId: Int
    emailConversationId: String
  }

  type Query {
    emailMessageReceiveds: [EmailMessageReceived!]! @requireAuth
    emailMessageReceived(id: Int!): EmailMessageReceived @requireAuth
  }

  input CreateEmailMessageReceivedInput {
    messageId: String!
    conversationId: String!
    extract: String!
    handleTime: Int!
    dateReceived: DateTime!
    emailId: Int
    emailConversationId: String
  }

  input UpdateEmailMessageReceivedInput {
    messageId: String
    conversationId: String
    extract: String
    handleTime: Int
    dateReceived: DateTime
    emailId: Int
    emailConversationId: String
  }

  type Mutation {
    createEmailMessageReceived(
      input: CreateEmailMessageReceivedInput!
    ): EmailMessageReceived! @requireAuth
    updateEmailMessageReceived(
      id: Int!
      input: UpdateEmailMessageReceivedInput!
    ): EmailMessageReceived! @requireAuth
    deleteEmailMessageReceived(id: Int!): EmailMessageReceived! @requireAuth
  }
`
