import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { store } from 'store';
import { fetchOffersAction } from 'store/offer/api-actions';
import { getInitialOffers, getOffersDataLoading } from 'store/selectors';
import { AppRoute, PagesOption } from 'const';
import { useAppSelector } from 'hooks';
import { Header } from 'components';
import { LoadingScreen } from 'pages';

const getPagesOption = (location: string, id: string | undefined, isNotEmptyOffers: boolean) => {
  const appRouteOffer = id ? AppRoute.OfferById.replace(/:id/, id) : AppRoute.Offer;

  switch (location) {
    case AppRoute.Main:
      if (!isNotEmptyOffers) {
        return PagesOption.Empty;
      }
      return PagesOption.Main;
    case AppRoute.Login:
      return PagesOption.Login;
    case appRouteOffer:
      return PagesOption.Offer;
    default:
      return PagesOption.NotFound;
  }
};

function Layout() {
  const { pathname } = useLocation();
  const { id: offerId } = useParams();

  const isLoading = useAppSelector(getOffersDataLoading);
  const offers = useAppSelector(getInitialOffers);

  // хоть мы и проговаривали, но так до конца и не понял как без хука вызвать и как здесь использовать useAppDispatch. нужно еще раз разобрать
  useEffect(() => {
    store.dispatch(fetchOffersAction());
  }, []);


  const { title, postfixCls } = getPagesOption(pathname, offerId, Boolean(offers.length));

  if (isLoading && !offers.length) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--${postfixCls}`}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
