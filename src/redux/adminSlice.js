import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getKeycloakUsers } from "../components/API/Connection";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, () => {
        console.log("Getting users");
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("Users fetched");
        state.users = action.payload;
      });
  },
});

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const [error, users] = await getKeycloakUsers();
  console.log("ERR:", error);
  return users;
});

export default adminSlice.reducer;
