import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ArticlesProp } from "./articleFetchSlice";


interface CreateByData {
    _id: string;
    username: string;
    fullname: string;
}
export interface categoryFetchedData {
    _id: string;
    title: string;
    createdBy: CreateByData;
    featuredImagealt: string;
    category: string;
    slug: string;
    description: string;
    blogImageUrl: string;
    createdAt: string;
}

export const fetchCategories = createAsyncThunk<ArticlesProp, { category: string, fetchedArticleLength?: number }, { rejectValue: string }>(
    "categories/fetchCategories",
    async ({ category, fetchedArticleLength }, thunkApi) => {
        try {
            const response = await fetch(`/api/category/?category=${category}&fetchedArticleLength=${fetchedArticleLength}`);
            if (response.ok) {
                const responseJson = await response.json();                
                return responseJson.data as ArticlesProp;
            } else {
                return thunkApi.rejectWithValue("Internal Server Error");
            }
        } catch (error) {
            console.log("Error", error);
            return thunkApi.rejectWithValue("Internal Server Error");
        }
    }
);

interface CategoryState {
    data: Record<string, ArticlesProp> | null;
    error: null | string;
    loading: boolean;
}

const initialState: CategoryState = {
    data: null,
    error: null,
    loading: false,
}

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            let data = action.payload;

            if (!state.data) {
                state.data = {};
            }
            
            let previousData = state?.data[data?._id];

            if (previousData) {
                const filterData = new Map(previousData.articles.concat(data.articles).map((v,i)=> [v._id,v]));                
                previousData.articles = [...filterData.values()];
                state.data[data?._id] = previousData;
            } else {
                state.data[data?._id] = data;
            }
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || null;
        });
    }
})

export default categorySlice.reducer;