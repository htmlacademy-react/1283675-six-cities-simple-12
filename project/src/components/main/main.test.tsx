import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { createAPI } from 'services/api';
import { OffersData, OffersList, User, State } from 'types/state';
import { makeFakeOffers, makeFakeReviews, makeFakeUser } from 'utils/mocks';
import { AuthorizationStatus, DEFAULT_CITY, DEFAULT_SORTING } from 'const';
import { HistoryRouter } from 'components';
import MainContent from './main';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockUserState: User = {
  authorizationStatus: AuthorizationStatus.Auth,
  userData: makeFakeUser(),
};

const fakeOffers = makeFakeOffers();

const mockDataState: OffersData = {
  offers: {
    data: fakeOffers,
    isDataLoading: false,
  },
  offer: {
    targetOffer: fakeOffers[0],
    nearbyOffers: makeFakeOffers(3),
    reviews: makeFakeReviews(),
    isInitial: false,
    isDataLoading: false,
    isError: false,
  },
  review: {
    isSending: false,
    isSendingError: false,
  },
};

const mockOfferState: OffersList = {
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING,
};

const fakeStore = mockStore({
  USER: mockUserState,
  DATA: mockDataState,
  OFFER: mockOfferState,
});

const history = createMemoryHistory();

Element.prototype.scrollTo = jest.fn();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <MainContent />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);

describe('Component: MainContent', () => {
  it('should render correctly if places available', () => {
    mockDataState.offers.data[0].city.name = mockOfferState.city;

    render(fakeApp);

    const filteredOffers = mockDataState.offers.data.filter(
      ({ city }) => city.name === mockOfferState.city
    );

    const pluralText = (filteredOffers.length === 1) ? 'place' : 'places';

    expect(
      screen.getByText(
        `${filteredOffers.length} ${pluralText} to stay in ${mockOfferState.city}`
      )
    ).toBeInTheDocument();
  });
});
