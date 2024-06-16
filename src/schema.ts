export const typeDefs = `#graphql
    type Query {
        singleUser: User
        users: [User]
        posts: [Post]
        singlePost (postId: ID!): Post
        requestedPosts: AllPostPayload
        myPosts: AllPostPayload
        profile: ProfileQueryPayload
    }

    type Mutation {
        registration(
            name: String!,
            email: String!,
            password: String!
            image: String!
        ): AuthPayload,
        
        login(
            email: String!
            password: String!
        ): AuthPayload,

        addPost(post: PostInput!): PostPayload,
        updatePost(postId: ID!, post: PostInput!): PostPayload,
        deletePost(postId: ID!): PostPayload,
        publishPost(postId: ID!): PostPayload
        updateProfile(profile: ProfileInfo!, user: UserInfo! ): ProfilePayload,
    }

    type Post {
        id: ID!
        title: String!
        image: String!
        content: String!
        author: User
        createdAt: String!
        published: String!
        isDeleted: String!
    }

    type User {
        id: ID!  
        name: String!
        email: String!
        createdAt: String!
        profile: Profile
        posts: [Post]
    }

    type Profile {
        id: ID!
        image: String!
        bio: String!
        country: String!
        city: String!
        number: String!      
        createdAt: String!
        user: User!
    }

    type UserAndProfile {
        user: User
        profile: Profile
    }
    type AuthPayload {
        userError: String
        token: String
    }

    type PostPayload {
        userError: String
        result: Post
    }
    type AllPostPayload {
        userError: String
        result: [Post]
    }
    type ProfileQueryPayload {
        userError: String
        result: Profile
    }
    type ProfilePayload {
        userError: String
        result: UserAndProfile
    }

    input UserInfo {
        name:String
       
        
    }
    input ProfileInfo {
       
        image: String
        bio: String
        country: String
        city:String
        number: String
        
    }

    input PostInput {
        title: String
        content: String
        image: String
    }
`;
