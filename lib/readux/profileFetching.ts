import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ArticleProps {
    _id: string
    slug: string
    title: string
    views: number
    public: boolean
    category: string
    updatedAt: string
    createdAt: string
    description: string
    blogImageUrl: string
    featuredImagealt: string
}

export interface ProfileProps {
    _id: string;
    email: string;
    updatedAt: Date;
    fullname: string;
    username: string;
    isYouOwner: boolean;
    isFollowing: boolean;
    followerCount: number;
    arrayOfArticles: {
        _id: string;
        articles: ArticleProps[],
        totalSizeOfArticles: number
    }[]
}

let intialProfile: Partial<ProfileProps> = {};

const initialState = {
    loading: false,
    error: "",
    intialProfile
}

export const profileAsyncThunk = createAsyncThunk<ProfileProps, { profile: string }>(
    "profile",
    async ({ profile }, thunkApi) => {
        try {
            const response = await fetch(`/api/profile?profileName=${profile}`);
            const JsonResponse = await response.json();
            // console.log("JosnResponse:- ", JsonResponse);
            return JsonResponse.data
        } catch (error) {
            console.log("Error in profileAsyncThunk:- ", error);
            thunkApi.rejectWithValue(`Error in ProfileAsyncThunk ${error}`)
        }
    }
)

const profileFetching = createSlice({
    name: "profile",
    initialState,
    reducers: {
        addingNewArticle: (state, payload: { type: string, payload: { section: string, data: ArticleProps[] } }) => {
            let copyIntialResult = state.intialProfile.arrayOfArticles;
            if (!copyIntialResult) {
                copyIntialResult = []
            };
            console.log("payload:- ", payload);
            const { data, section } = payload.payload
            state.intialProfile.arrayOfArticles = copyIntialResult.map((v,i)=> v._id === section? {...v,articles:[...v.articles,...data]}:v);

            return state
        }
    },
    extraReducers(builder) {
        builder.addCase(profileAsyncThunk.pending, (state, action) => {
            state.loading = true,
                state.error = ""
        });
        builder.addCase(profileAsyncThunk.fulfilled, (state, action) => {
            state.loading = false,
                state.intialProfile = action.payload
        });
        builder.addCase(profileAsyncThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? ""
        })
    },
})

export const { addingNewArticle } = profileFetching.actions

export const profileFetchingData = profileFetching.reducer