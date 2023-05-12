import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productInHome: {
    name: {
      type: "search[]",
      value: "",
    },
    marker: {
      type: null,
      value: 1,
    },
    limit: {
      type: null,
      value: 16,
    },
  },

  productInDetailBrand: {
    name: {
      type: "search[]",
      value: "",
    },
    limit: {
      type: null,
      value: 8,
    },
    provider_id: {
      type: "fields[]",
      value: null,
    },
    marker: {
      type: null,
      value: null,
    },
  },

  filterBrand: {
    name: {
      type: "search[]",
      value: null,
    },
    marker: {
      type: null,
      value: 1,
    },
    limit: {
      type: null,
      value: 8,
    },
  },

  filterCommentInProductDetail: {
    name: {
      type: "search[]",
      value: "",
    },
    rating: {
      type: "fields[]",
      value: null,
    },
    marker: {
      type: null,
      value: 1,
    },
    limit: {
      type: null,
      value: 6,
    },
  },

  filterInCategoryPage: {
    name: {
      type: "search[]",
      value: null,
    },
    provider_id: {
      type: "fields[]",
      value: null,
    },
    rating: {
      type: "fields[]",
      value: null,
    },
    marker: {
      type: null,
      value: null,
    },
    type: {
      type: null,
      value: null,
    },
    limit: {
      type: null,
      value: null,
    },
  },

  sortInCategoryPage: {
    name: {
      type: "sorts[]",
      value: null,
    },
    price: {
      type: "sorts[]",
      value: null,
    },
  },

  filterBrandInCategoryPage: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: null,
    },
  },

  filterOrderInAccountPage: {
    status: {
      type: "fields[]",
      value: null,
    },
    limit: {
      type: null,
      value: 4,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  productInAddBanner: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 8,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  productInUpdateBanner: {
    name: {
      type: "search[]",
      value: null,
    },
    limit: {
      type: null,
      value: 8,
    },
    marker: {
      type: null,
      value: 1,
    },
  },

  filterChannel: {
    type: {
      type: null,
      value: "cursor",
    },
    marker: {
      type: null,
      value: 1  ,
    },
    limit: {
      type: null,
      value: 5,
    },
  },

  filterMessage: {
    type: {
      type: null,
      value: "cursor",
    },
    marker: {
      type: null,
      value: null,
    },
    limit: {
      type: null,
      value: 10,
    },
    id:{
      type:"sorts[]",
      value:"DESC"
    }
  },

  filterNotify: {
    type: {
      type: null,
      value: "cursor",
    },
    marker: {
      type: null,
      value: 1,
    },
  },
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    resetFilterInCategory: () => initialState,
    //product
    setNameSearchInProductInHome: (state, action) => {
      state.productInHome.name.value = action.payload;
    },
    setPageInProductInHome: (state, action) => {
      state.productInHome.marker.value = action.payload;
    },
    setLimitInProductInHome: (state, action) => {
      state.productInHome.limit.value = action.payload;
    },

    //brand
    setNameSearchInBrand: (state, action) => {
      state.filterBrand.name.value = action.payload;
    },
    setPageInFilterBrand: (state, action) => {
      state.filterBrand.marker.value = action.payload;
    },
    setLimitInFilterBrand: (state, action) => {
      state.filterBrand.limit.value = action.payload;
    },

    //comment
    setNameSearchInComment: (state, action) => {
      state.filterCommentInProductDetail.name.value = action.payload;
    },
    setRatingInComment: (state, action) => {
      state.filterCommentInProductDetail.rating.value = action.payload;
    },
    setPageInComment: (state, action) => {
      state.filterCommentInProductDetail.marker.value = action.payload;
    },
    setLimitInComment: (state, action) => {
      state.filterCommentInProductDetail.limit.value = action.payload;
    },

    //productInDetailBrand
    setNameSearchInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.name.value = action.payload;
    },
    setPageInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.marker.value = action.payload;
    },
    setLimitInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.limit.value = action.payload;
    },
    setProviderIDInProductInDetailBrand: (state, action) => {
      state.productInDetailBrand.provider_id.value = action.payload;
    },

    //filter category
    setProviderIDInFilterCategory: (state, action) => {
      state.filterInCategoryPage.provider_id.value = action.payload;
    },
    setMarkerInFilterCategory: (state, action) => {
      state.filterInCategoryPage.marker.value = action.payload;
    },
    setLimitInFilterCategory: (state, action) => {
      state.filterInCategoryPage.limit.value = action.payload;
    },
    setRatingInFilterCategory: (state, action) => {
      state.filterInCategoryPage.rating.value = action.payload;
    },
    setNameInFilterCategory: (state, action) => {
      state.filterInCategoryPage.name.value = action.payload;
    },

    //sort in category
    setSortPriceInSortCategory: (state, action) => {
      state.sortInCategoryPage.price.value = action.payload;
    },
    setSortNameInSortCategory: (state, action) => {
      state.sortInCategoryPage.name.value = action.payload;
    },

    //filter brand in category
    setSearchInBrandInFilterCategory: (state, action) => {
      state.filterBrandInCategoryPage.name.value = action.payload;
    },

    //filter order in account
    setStatusInOrderInAccount: (state, action) => {
      state.filterOrderInAccountPage.status.value = action.payload;
    },
    setLimitInOrderInAccount: (state, action) => {
      state.filterOrderInAccountPage.limit.value = action.payload;
    },
    setPageInOrderInAccount: (state, action) => {
      state.filterOrderInAccountPage.marker.value = action.payload;
    },

    //productInAddBanner
    setNameInProductInAddBanner: (state, action) => {
      state.productInAddBanner.name.value = action.payload;
    },
    setLimitInProductInAddBanner: (state, action) => {
      state.productInAddBanner.limit.value = action.payload;
    },
    setPageInProductInAddBanner: (state, action) => {
      state.productInAddBanner.marker.value = action.payload;
    },

    //productInUpdateBanner
    setNameInProductInUpdateBanner: (state, action) => {
      state.productInUpdateBanner.name.value = action.payload;
    },
    setLimitInProductInUpdateBanner: (state, action) => {
      state.productInUpdateBanner.limit.value = action.payload;
    },
    setPageInProductInUpdateBanner: (state, action) => {
      state.productInUpdateBanner.marker.value = action.payload;
    },

    //Websocket
    setMarkerInFilterChannel: (state, action) => {
      state.filterChannel.marker.value = action.payload;
    },
    setMarkerInFilterMessage: (state, action) => {
      state.filterMessage.marker.value = action.payload;
    },
    setMarkerInFilterNotify: (state, action) => {
      state.filterNotify.marker.value = action.payload;
    },
    
  },
});

export const {
  setNameSearchInProductInHome,
  setPageInProductInHome,

  setNameSearchInBrand,
  setPageInFilterBrand,
  setLimitInFilterBrand,

  setNameSearchInComment,
  setRatingInComment,
  setPageInComment,
  setLimitInComment,

  setNameSearchInProductInDetailBrand,
  setPageInProductInDetailBrand,
  setLimitInProductInDetailBrand,
  setProviderIDInProductInDetailBrand,

  resetFilterInCategory,
  setNameInFilterCategory,
  setProviderIDInFilterCategory,
  setMarkerInFilterCategory,
  setLimitInFilterCategory,
  setRatingInFilterCategory,

  setSortPriceInSortCategory,
  setSortNameInSortCategory,

  setSearchInBrandInFilterCategory,

  setStatusInOrderInAccount,
  setPageInOrderInAccount,
  setLimitInOrderInAccount,

  setNameInProductInAddBanner,
  setLimitInProductInAddBanner,
  setPageInProductInAddBanner,

  setNameInProductInUpdateBanner,
  setLimitInProductInUpdateBanner,
  setPageInProductInUpdateBanner,

  setMarkerInFilterChannel,
  setMarkerInFilterMessage,
  setMarkerInFilterNotify,
} = querySlice.actions;

export default querySlice.reducer;
