import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../hooks/useAppDispatch.ts";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../Pagination";
import { SearchContext } from "../App";
import { useSelector } from "react-redux";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isMounted = React.useRef(false); // 🔧 оставляем — нужен для URL

  const { categoryId, sort, currentPage } = useSelector(selectFilter);

  // 🔧 ИСПРАВЛЕНО: берём items И status из Redux
  const { items, status } = useSelector(selectPizzaData);

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = React.useCallback(
    (id) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  // 🔧 ИСПРАВЛЕНО: убрали async / await / isLoading
  const getPizzas = () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
  };

  // 🔧 ИСПРАВЛЕНО: синхронизация URL
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  // 🔧 ИСПРАВЛЕНО: читаем параметры из URL при первом рендере
  React.useEffect(() => {
    const params = qs.parse(window.location.search.substring(1));

    const sortFromUrl =
      sortList.find((obj) => obj.sortProperty === params.sortProperty) ||
      sortList[0];

    dispatch(
      setFilters({
        ...params,
        sort: sortFromUrl,
        currentPage: 1,
      }),
    );
  }, [dispatch]);

  // 🔧 ИСПРАВЛЕНО: загрузка пицц
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = React.useMemo(
    () => items.map((obj) => <PizzaBlock key={obj.id} {...obj} />),
    [items],
  );

  const onChangePage = React.useCallback(
    (num) => dispatch(setCurrentPage(num)),
    [dispatch],
  );

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {/* 🔧 ИСПРАВЛЕНО: рендер через status из Redux */}
      <div className="content__items">
        {status === "loading" && skeletons}
        {status === "success" && pizzas}
        {status === "error" && (
          <p className="Error">Ошибка загрузки походу пицц не будет.. 😕</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Home;
