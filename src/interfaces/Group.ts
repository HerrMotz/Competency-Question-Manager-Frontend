type GroupT = {
    id: string,
    name: string,
    project: ProjectFullT,
    noMembers: number,
    noQuestions: number,
    createdAt: string,
    updatedAt: string
};

type GroupFullT = {
    
    name: String,
    project: {
    name: String,
    description: null,
    id: String,
    createdAt: String,
    updatedAt: String
    },
    members: [
        {
        email: String,
        name: String,
        id: String
        }
    ],
    questions: [
        {
        author: {
        email: String,
        name: String,
        id: String
        },
        aggregatedRating: Number,
        question: String
        }
    ],
    noMembers: Number,
    noQuestions: Number,
    id: String,
    createdAt: String,
    updatedAt: String
      
}