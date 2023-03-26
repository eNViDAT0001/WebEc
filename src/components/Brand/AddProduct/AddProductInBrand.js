import { Divider } from "@mui/material";
import React, { useState } from "react";
import { AddBasicInformation } from "./AddBasicInformation";
import { AddImage } from "./AddImage";
import { AddSpecification } from "./AddSpecification";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ImageIcon from "@mui/icons-material/Image";
import ListIcon from "@mui/icons-material/List";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useParams } from "react-router-dom";
import { AddDescriptions } from "./AddDescriptions";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  addProduct,
  checkValidAdd,
  convertBody,
  useCategoryId,
  useDescriptionMD,
  useDescriptionName,
  useDiscount,
  useMedia,
  useName,
  useOptions,
  usePrice,
  useSpecificationName,
} from "../../../app/hook/ProductHook";

export const AddProductInBrand = () => {
  const { id } = useParams(); //provider
  const [openButon, setOpenButton] = useState(true);
  const name = useName();
  const category_id = useCategoryId();
  const price = usePrice();
  const discount = useDiscount();
  const media = useMedia();
  const options = useOptions();
  const specification_name = useSpecificationName();
  const description_name = useDescriptionName();
  const description_md = useDescriptionMD();

  const addNewProduct = (e) => {
    if (
      checkValidAdd(
        name,
        category_id,
        price,
        specification_name,
        media,
        description_name,
        description_md
      )
    ) {
      const body = convertBody(
        category_id,
        name,
        discount,
        price,
        media,
        specification_name,
        options,
        description_name,
        description_md
      );
      addProduct(id, localStorage.getItem("UserID"), body);
    } else {
      console.log("invalid");
    }
  };

  return (
    <div className="flex justify-center bg-[#F5F5F5] font-[Montserrat]">
      <ToastContainer position="top-right" newestOnTop />
      <div className="w-[65%] my-10 p-10 border rounded-2xl shadow-xl bg-white space-y-6">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className=" text-2xl font-bold">ADD YOUR PRODUCT</h1>
          <h1 className=" text-sm text-[#9096B2]">
            Please fill out the information completely{" "}
          </h1>
        </div>
        <div className="flex flex-row space-x-5">
          <LocalLibraryIcon />
          <h1 className="text-xl font-bold">Basic information :</h1>
        </div>
        <Divider />
        <AddBasicInformation />
        <div className="flex flex-row space-x-5">
          <ImageIcon />
          <h1 className="text-xl font-bold">Image :</h1>
        </div>
        <Divider />
        <AddImage />
        <div className="flex flex-row space-x-5">
          <ListIcon />
          <h1 className="text-xl font-bold">Specification :</h1>
        </div>
        <Divider />
        <AddSpecification />
        <div className="flex flex-row space-x-5">
          <DescriptionIcon />
          <h1 className="text-xl font-bold">Description :</h1>
        </div>
        <Divider />
        <AddDescriptions />

        <div className="flex flex-row-reverse">
          <Button
            disabled={!openButon}
            variant="contained"
            onClick={addNewProduct}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
