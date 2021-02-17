import React, { useEffect, useState } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import "./style.css";
const Menu = ({
  categories,
  shopLeftMenuMob,
  setCategory,
  setSubCategory,
  setSubSubCategory,
  setShopLeftMenuMob,
  getProductsList,
  isSelectedCategory,
  isSelectedSubCategory,
  isSelectedSubSubCategory,
}) => {
  //console.log("categories", shopLeftMenuMob, categories);
  const [activeCat, setCat] = useState("");
  const [activeSubCat, setSubCat] = useState("");

  useEffect(() => {
    if (
      isSelectedCategory &&
      (isSelectedCategory || isSelectedSubCategory || isSelectedSubSubCategory)
    ) {
      window.scrollTo(0, 0);
      getProductsList(
        null,
        null,
        isSelectedCategory,
        isSelectedSubSubCategory,
        null,
        null,
        "",
        isSelectedSubCategory
      );
    }
  }, [isSelectedCategory, isSelectedSubCategory, isSelectedSubSubCategory]);
  // useEffect(() => {
  //   if (!activeCat && Object.keys(categories)?.[0]) {
  //     setCat(Object.keys(categories)?.[0]);
  //   }
  // }, [categories]);

  return (
    shopLeftMenuMob && (
      <div className="shopMenuLeft animated slideInLeft">
        <div className="shopMenuLeft--categories">
          {Object.keys(categories).map((catKey, ind) => {
            return (
              <>
                <div
                  key={catKey + ind}
                  className={
                    "shopMenuLeft--categories__item" +
                    (activeCat === catKey ? " active" : "")
                  }
                >
                  <i
                    className={
                      "fal" + ` ${categories?.[catKey].name.toLowerCase()}`
                    }
                    aria-hidden="true"
                  ></i>
                  <span
                    onClick={() => {
                      setShopLeftMenuMob(false);
                      window.location.hash = `product-filtered/${categories?.[
                        catKey
                      ].name
                        .toString()
                        .replace(/ \| /g, "__")}`;
                      setCategory(categories?.[catKey].name);
                      setSubCategory(null);
                      setSubSubCategory(null);
                    }}
                  >
                    {" "}
                    {categories?.[catKey].name}
                  </span>
                  <i
                    className={`fal fa-chevron-${
                      activeCat === catKey ? "up" : "down"
                    }`}
                    aria-hidden="true"
                    onClick={() => {
                      setCat(activeCat === catKey ? "" : catKey);
                    }}
                  ></i>
                </div>
                {activeCat === catKey && (
                  <div className="childrensCat " key={catKey}>
                    {Object.keys(categories?.[catKey]?.subcategories || [])
                      .length > 0 ? (
                      Object.keys(
                        categories?.[catKey]?.subcategories || []
                      ).map((subKey) => {
                        return (
                          <>
                            <div
                              key={subKey}
                              className="shopMenuLeft--categories__item"
                            >
                              <span
                                onClick={() => {
                                  setShopLeftMenuMob(false);
                                  window.location.hash = `product-filtered/${categories?.[
                                    catKey
                                  ].name
                                    .toString()
                                    .replace(/ \| /g, "__")}`;
                                  setCategory(categories?.[catKey].name);
                                  setSubCategory(
                                    categories?.[catKey].subcategories[subKey]
                                      .name
                                  );
                                  setSubSubCategory(null);
                                }}
                              >
                                {
                                  categories?.[catKey].subcategories[subKey]
                                    .name
                                }
                              </span>
                              <i
                                className={`fal fa-chevron-${
                                  activeSubCat === subKey ? "up" : "down"
                                }`}
                                aria-hidden="true"
                                onClick={() => {
                                  setSubCat(
                                    activeSubCat === subKey ? "" : subKey
                                  );
                                }}
                              ></i>
                            </div>
                            {subKey === activeSubCat && (
                              <div className="childrensSubCat animated fadeIn">
                                {Object.keys(
                                  categories?.[catKey].subcategories[subKey]
                                    .subcategories
                                ).map((subSubKey) => {
                                  return (
                                    <div
                                      key={subSubKey}
                                      className="shopMenuLeft--categories__item"
                                      onClick={() => {
                                        setShopLeftMenuMob(false);
                                        window.location.hash = `product-filtered/${categories?.[
                                          catKey
                                        ].name
                                          .toString()
                                          .replace(/ \| /g, "__")}`;
                                        setCategory(categories?.[catKey].name);
                                        setSubCategory(
                                          categories?.[catKey].subcategories[
                                            subKey
                                          ].name
                                        );
                                        setSubSubCategory(
                                          categories?.[catKey].subcategories[
                                            subKey
                                          ].subcategories[subSubKey].name
                                        );
                                      }}
                                    >
                                      <span>
                                        {
                                          categories?.[catKey].subcategories[
                                            subKey
                                          ].subcategories[subSubKey].name
                                        }
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        );
                      })
                    ) : (
                      <div className="shopMenuLeft--categories__item">
                        No items
                      </div>
                    )}
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    )
  );
};
const mstp = ({
  shop: {
    categories,
    shopLeftMenuMob,
    isSelectedCategory,
    isSelectedSubCategory,
    isSelectedSubSubCategory,
  },
}) => {
  return {
    categories,
    shopLeftMenuMob,
    isSelectedCategory,
    isSelectedSubCategory,
    isSelectedSubSubCategory,
  };
};
export default connect(mstp, ShopActions)(Menu);
