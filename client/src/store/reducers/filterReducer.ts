import { createSlice } from '@reduxjs/toolkit';

interface subFilterState {
    played?: boolean | null;
    liked?: boolean | null;
}

interface FilterState {
    search?: string | null;
    order?: 'asc' | 'desc' | null;
    sortBy?: 'likes' | 'newest' | 'recentPlayed' | 'alphabetical' | null;
    filter?: subFilterState;
}

const initialState: FilterState = {
    search: null,
    order: null,
    sortBy: null,
    filter: {
        played: null,
        liked: null,
    },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { setSearch, setOrder, setSortBy, setFilter } = filterSlice.actions;
export default filterSlice.reducer;
