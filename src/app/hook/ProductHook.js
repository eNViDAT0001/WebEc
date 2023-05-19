import { useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setListBanner } from "../slices/BannerSlice";
import { setCategoryRoot } from "../slices/CategorySlice";
import { toast } from "react-toastify";
import {
  setDescriptionProduct,
  setImageProduct,
  setListProductInAdmin,
  setMetaInProductInAdmin,
  setMetaInProductInHome,
  setProductDetail,
  setProductForYou,
  setProductInHome,
  setSpecificationProduct,
} from "../slices/ProductSlice";
import { ProductApi } from "../../api/ProductApi";
import { fetchCommentInProductDetail } from "./CommentHook";
import { useEffect } from "react";
import { uploadFileNotNotify } from "./FileHook";
import {
  setCategoryIDFix,
  setDataOptionFix,
  setDescriptionOld,
  setDiscountFix,
  setHeightFix,
  setLengthFix,
  setListMediaOld,
  setNameFix,
  setPriceFix,
  setSpecificationNameFix,
  setWeightFix,
  setWidthFix,
} from "../slices/FixProductSlice";
import { fetchListTreeCategoryInUpdateProduct } from "./CategoryHook";
import { buildCategoryTree, checkObjectEmpty } from "./CommonHook";
import { setTreeCategoryInAddProduct } from "../slices/AddProductSlice";

export const useProductInHome = () =>
  useSelector((state) => state.product.productInHome);
export const useMetaInProductInHome = () =>
  useSelector((state) => state.product.metaInProductInHome);
export const useImageProduct = () =>
  useSelector((state) => state.product.imageProduct);
export const useProductDetail = () =>
  useSelector((state) => state.product.productDetail);
export const useDescriptionProduct = () =>
  useSelector((state) => state.product.descriptionProduct);
export const useSpecificaionProduct = () =>
  useSelector((state) => state.product.specificationProduct);
export const useOptionHandle = () =>
  useSelector((state) => state.product.optionHandle);
export const useQuantityHandle = () =>
  useSelector((state) => state.product.quantityHandle);
export const useFilterProductInHome = () =>
  useSelector((state) => state.query.productInHome);
export const useProductForyou = () =>
  useSelector((state) => state.product.productForyou);

export const useFetchFullFromHomePage = async (filter) => {
  const dispatch = useDispatch();
  const prevFilterRef = useRef(filter);
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        if (filter !== prevFilterRef.current) {
          await dispatch(fetchProductInHomePage(filter));
        } else {
          await dispatch(fetchBannerInHomePage())
            .then(() => {
              return dispatch(fetchCategoryRoofInHomePage());
            })
            .then(() => {
              return dispatch(fetchProductInHomePage(filter));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (err) {}
    };
    fetchData();
  }, [dispatch, filter, prevFilterRef]);
};

const fetchProductInHomePage = (filter) => async (dispatch) => {
  try {
    await ProductApi.GetProductPreview(filter).then((res) => {
      dispatch(setProductInHome(res.data.data));
      dispatch(setMetaInProductInHome(res.data.meta));
    });
  } catch (err) {}
};

const fetchCategoryRoofInHomePage = () => async (dispatch) => {
  try {
    await ProductApi.GetCategoriesRoof().then((res) => {
      dispatch(setCategoryRoot(res.data.data));
    });
  } catch (err) {}
};

const fetchBannerInHomePage = () => async (dispatch) => {
  try {
    await ProductApi.GetBanners().then((res) => {
      dispatch(setListBanner(res.data.data));
    });
  } catch (err) {}
};

export const useFetchFullFromProductDetail = async (id, filter) => {
  const dispatch = useDispatch();
  const prevFilterRef = useRef(filter);
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        if (filter !== prevFilterRef.current) {
          await dispatch(fetchCommentInProductDetail(id, filter));
        } else {
          await dispatch(fetchBasicInformationInProductDetailPage(id))
            .then(() => {
              return dispatch(fetchMediaInProductDetailPage(id));
            })
            .then(() => {
              return dispatch(fetchSpecificationInProductDetailPage(id));
            })
            .then(() => {
              return dispatch(fetchDescriptionInProductDetailPage(id));
            })
            .then(() => {
              return dispatch(fetchCommentInProductDetail(id, filter));
            })
            .then(() => {
              return dispatch(fetchProductForyou());
            })
            .catch((error) => {
              console.log(error);
            });
        }
        prevFilterRef.current = filter;
      } catch (err) {}
    };
    fetchData();
  }, [id, dispatch, filter, prevFilterRef]);
};

const fetchBasicInformationInProductDetailPage = (id) => async (dispatch) => {
  try {
    await ProductApi.GetDetailProduct(id).then((res) => {
      dispatch(setProductDetail(res.data.data));
    });
  } catch (error) {}
};

const fetchProductForyou = () => async (dispatch) => {
  try {
    await ProductApi.GetProductPreview("limit=4").then((res) => {
      dispatch(setProductForYou(res.data.data));
    });
  } catch (err) {}
};

const fetchMediaInProductDetailPage = (id) => async (dispatch) => {
  try {
    await ProductApi.GetMedia(id).then((res) => {
      dispatch(setImageProduct(res.data.data));
    });
  } catch (error) {}
};

const fetchSpecificationInProductDetailPage = (id) => async (dispatch) => {
  try {
    await ProductApi.GetSpecification(id).then((res) => {
      dispatch(setSpecificationProduct(res.data.data));
    });
  } catch (error) {}
};

const fetchDescriptionInProductDetailPage = (id) => async (dispatch) => {
  try {
    await ProductApi.GetDescriptionFromProduct(id).then((res) => {
      dispatch(setDescriptionProduct(res.data.data));
    });
  } catch (error) {}
};

//add Product
export const useName = () => useSelector((state) => state.addProduct.name);
export const useCategoryId = () =>
  useSelector((state) => state.addProduct.category_id);
export const usePrice = () => useSelector((state) => state.addProduct.price);
export const useDiscount = () =>
  useSelector((state) => state.addProduct.discount);
export const useMedia = () => useSelector((state) => state.addProduct.media);
export const useOptions = () =>
  useSelector((state) => state.addProduct.options);
export const useSpecificationName = () =>
  useSelector((state) => state.addProduct.specification_name);
export const useDescriptions = () =>
  useSelector((state) => state.addProduct.descriptions);
export const useTreeInAddProduct = () =>
  useSelector((state) => state.addProduct.treeCategoryInAddProduct);
export const useHeightInAdd = () =>
  useSelector((state) => state.addProduct.height);
export const useWeightInAdd = () =>
  useSelector((state) => state.addProduct.weight);
export const useLengthInAdd = () =>
  useSelector((state) => state.addProduct.length);
export const useWidthInAdd = () =>
  useSelector((state) => state.addProduct.width);
export const convertMediaToBody = (media) => {
  const listMedia = [];
  media.map((data) => {
    const newData = {
      public_id: data.public_id,
      media_path: data.url,
      media_type: "IMAGE",
    };
    listMedia.push(newData);
  });
  return listMedia;
};

export const useFetchCategoryInAddProduct = async () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchListTreeCategoryInAddProduct());
    };

    fetchData();
  }, [dispatch]);
};
const fetchListTreeCategoryInAddProduct = () => async (dispatch) => {
  try {
    await ProductApi.GetListCategoriesTree().then((res) => {
      const treeBuild = buildCategoryTree(res.data.data);
      dispatch(setTreeCategoryInAddProduct(treeBuild));
    });
  } catch (err) {}
};

const changeDescriptionToBody = async (descriptions) => {
  const result = [];
  if (!checkObjectEmpty(descriptions)) {
    await Promise.all(
      descriptions.map(async (data) => {
        const formData = new FormData();
        const fileText = new File([data.description_md], "filename.txt", {
          type: "text/plain",
        });

        formData.append("files", fileText);
        const res = await uploadFileNotNotify(formData);
        const newRes = {
          public_id: res.data[0].public_id,
          name: data.description_name,
          path: res.data[0].url,
        };
        result.push(newRes);
      })
    );
  }
  return result;
};

export const convertBodyFixProduct = async (
  category_id,
  name,
  discount,
  price,
  media,
  specification_name,
  options,
  descriptions,
  height,
  length,
  weight,
  width,
  listMediaOld,
  descriptionOld
) => {
  const body = {
    category_id: parseInt(category_id),
    name: name,
    discount: parseInt(discount),
    price: price,
    specification: {
      properties: specification_name,
    },
    options: options,
    height: parseInt(height),
    length: parseInt(length),
    weight: parseInt(weight),
    width: parseInt(width),
  };
  if (media.length !== 0) {
    body.media = mergeMediaToFix(media, listMediaOld);
  }
  await changeDescriptionToBody(descriptions).then((res) => {
    body.descriptions = mergeDescriptionToFix(res, descriptionOld);
  });
  return body;
};

const mergeDescriptionToFix = (descriptionNew, descriptionOld) => {
  const result = [];
  const smallIndex =
    descriptionNew.length <= descriptionOld.length
      ? descriptionNew.length
      : descriptionNew.length;

  for (let i = 0; i < smallIndex; i++) {
    console.log("i", i);
    const newObject = {
      id: descriptionOld[i].id,
      description: {
        name: descriptionNew[i].name,
        public_id: descriptionNew[i].public_id,
        descriptions_path: descriptionNew[i].path,
      },
    };
    result.push(newObject);
  }
  return result;
};

const mergeMediaToFix = (media, listMediaOld) => {
  const result = [];

  const smallIndex =
    media.length < listMediaOld.length ? media.length : listMediaOld.length;

  for (let i = 0; i < smallIndex; i++) {
    const newObject = {
      id: listMediaOld[i].id,
      media_path: media[i].url,
    };

    result.push(newObject);
  }

  return result;
};
export const convertBodyAddProduct = async (
  category_id,
  name,
  discount,
  price,
  media,
  specification_name,
  options,
  descriptions
) => {
  const descriptionBody = await changeDescriptionToBody(descriptions);
  const body = {
    category_id: parseInt(category_id),
    name: name,
    discount: discount,
    price: price,
    media: convertMediaToBody(media),
    specification: {
      properties: specification_name,
    },
    options: options,
    descriptions: descriptionBody,
  };
  return body;
};
export const addProduct = async (idProvider, userID, body) => {
  await ProductApi.AddNewProduct(idProvider, userID, body).then((res) => {
    toast("Add New Product Success", {
      type: "success",
      autoClose: 1000,
      onClose: setTimeout(() => {
        window.location.reload();
      }, 2000),
    });
  });
};

export const checkValidAdd = (
  name,
  category_id,
  price,
  specification_name,
  media
) => {
  if (name == "") {
    toast("Missing name", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else if (category_id == 0) {
    toast("Missing category", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else if (price == "") {
    toast("Missing price", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else if (specification_name == "") {
    toast("Missing name specification", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else if (media.length == 0) {
    toast("Missing media", {
      type: "warning",
      autoClose: 1000,
    });
  } else {
    return true;
  }
};

//admin

export const useListProductInAdmin = () =>
  useSelector((state) => state.product.listProductInAdmin);
export const useFilterInProductInAdmin = () =>
  useSelector((state) => state.query.filterProductTabAdmin);
export const useMetaInProductInAdmin = () =>
  useSelector((state) => state.product.metaInProductInAdmin);

export const useFetchProductInAdmin = async (filter) => {
  const dispatch = useDispatch();

  await useEffect(() => {
    dispatch(fetchProductInAdmin(filter));
  }, [dispatch, filter]);
};

const fetchProductInAdmin = (filter) => async (dispatch) => {
  try {
    await ProductApi.GetProductPreview(filter).then((res) => {
      dispatch(setListProductInAdmin(res.data.data));
      dispatch(setMetaInProductInAdmin(res.data.meta));
    });
  } catch (err) {}
};

export const deleteListProduct = (providerID, body) => async (dispatch) => {
  try {
    await ProductApi.DeleteListProduct(providerID, body).then(() => {
      toast("Delete list Product Success", {
        type: "success",
        autoClose: 1000,
        onClose: setTimeout(() => {
          window.location.reload();
        }, 2000),
      });
    });
  } catch (err) {}
};

//Fix product
export const useNameFix = () => useSelector((state) => state.fixProduct.name);
export const useCategoryIdFix = () =>
  useSelector((state) => state.fixProduct.category_id);
export const usePriceFix = () => useSelector((state) => state.fixProduct.price);
export const useDiscountFix = () =>
  useSelector((state) => state.fixProduct.discount);
export const useMediaFix = () => useSelector((state) => state.fixProduct.media);
export const useOptionsFix = () =>
  useSelector((state) => state.fixProduct.options);
export const useSpecificationNameFix = () =>
  useSelector((state) => state.fixProduct.specification_name);
export const useDescriptionsFix = () =>
  useSelector((state) => state.fixProduct.descriptions);
export const useHeightInFix = () =>
  useSelector((state) => state.fixProduct.height);
export const useWeightInFix = () =>
  useSelector((state) => state.fixProduct.weight);
export const useLengthInFix = () =>
  useSelector((state) => state.fixProduct.length);
export const useWidthInFix = () =>
  useSelector((state) => state.fixProduct.width);
export const useListMediaOld = () =>
  useSelector((state) => state.fixProduct.listMediaOld);
export const useDescriptionOld = () =>
  useSelector((state) => state.fixProduct.descriptionOld);
export const useFetchProductDetailToFix = (productID) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProductDetailForUpdate(productID))
          .then(() => {
            return dispatch(fetchListTreeCategoryInUpdateProduct());
          })
          .then(() => {
            return dispatch(fetchSpecificationInProductUpdate(productID));
          })
          .then(() => {
            return dispatch(fetchProductMediaForUpdate(productID));
          })
          .then(() => {
            return dispatch(fetchProductDescriptionForUpdate(productID));
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}
    };
    fetchData();
  }, [dispatch, productID]);
};

export const fetchProductDescriptionForUpdate =
  (productID) => async (dispatch) => {
    try {
      const res = await ProductApi.GetDescriptionFromProduct(productID);
      if (res) {
        dispatch(setDescriptionOld(res.data.data));
      }
    } catch (err) {}
  };

export const fetchProductMediaForUpdate = (productID) => async (dispatch) => {
  try {
    const res = await ProductApi.GetMedia(productID);
    if (res) {
      dispatch(setListMediaOld(res.data.data));
    }
  } catch (err) {}
};
export const fetchSpecificationInProductUpdate =
  (productID) => async (dispatch) => {
    try {
      const res = await ProductApi.GetSpecification(productID);
      if (res) {
        const options = res.data.data[0].options;
        for (let i = 0; i < options.length; i++) {
          options[i].id = i;
        }
        dispatch(setSpecificationNameFix(res.data.data[0].properties));
        dispatch(setDataOptionFix(options));
      }
    } catch (err) {}
  };

export const fetchProductDetailForUpdate = (productID) => async (dispatch) => {
  try {
    const res = await ProductApi.GetDetailProduct(productID);
    if (res) {
      dispatch(setNameFix(res.data.data.name));
      dispatch(setPriceFix(res.data.data.price));
      dispatch(setDiscountFix(res.data.data.discount));
      dispatch(setCategoryIDFix(res.data.data.category_id));
      dispatch(setHeightFix(res.data.data.height));
      dispatch(setWeightFix(res.data.data.weight));
      dispatch(setLengthFix(res.data.data.length));
      dispatch(setWidthFix(res.data.data.width));
    }
  } catch (err) {}
};

export const updateProduct = async (productID, body) => {
  await ProductApi.UpdateProduct(productID, body).then(() => {
    toast("Update Product Success", {
      type: "success",
      autoClose: 1000,
      onClose: setTimeout(() => {
        window.location.replace(`/product/${productID}`);
      }, 2000),
    });
  });
};

export const checkValidFix = (name, category_id, price, specification_name) => {
  if (name == "") {
    toast("Missing name", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else if (category_id == 0) {
    toast("Missing category", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else if (price == "") {
    toast("Missing price", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else if (specification_name == "") {
    toast("Missing name specification", {
      type: "warning",
      autoClose: 1000,
    });
    return false;
  } else {
    return true;
  }
};
