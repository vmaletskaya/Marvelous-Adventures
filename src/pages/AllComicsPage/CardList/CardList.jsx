import { useSearchParams, useLocation } from 'react-router-dom';
import ComicsCard from '../../../elements/ComicsCard/ComicsCard';
import { fetchAllComics } from '../../../services/api';
import css from './CardList.module.css';
import { useContext, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import PendingScreen from './PendingScreen';
import EmptyContainerPlaceholder from './EmptyContainerPlaceholder';
import LoadAnimation from '../../../elements/Animations/LoadAnimation';
import PaginationComponent from '../../../components/Pagination/Pagination';
import { ModalContext } from '../../../components/Modal/ModalContext/ModalContext';
import getObjFromParams from '../../../helpers/getSearchParamsValues';

import toastId from 'elements/Toasts/toastId';
import ErrorToast from '../../../elements/Toasts/ErrorToast';
import PendingToast from 'elements/Toasts/PendingToast';

const CardList = ({ cardLimit, isFormSearch, isFormDisabled }) => {
  const { state } = useLocation();
  const { openModal } = useContext(ModalContext);
  const isPageLoaded = useRef(false);

  window.addEventListener('offline', function () {
    setComics([]);
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [prevSearchState, setPrevSearchState] = useState();

  const [comics, setComics] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(0);

  //  first fetch
  useEffect(() => {
    setStatus('isFetching');

    const firstFetch = async () => {
      try {
        isFormDisabled(true);
        if (Number(searchParams.getAll('limit')) === 0) {
          searchParams.set('limit', cardLimit);
        } else {
          searchParams.set('limit', Number(searchParams.getAll('limit')));
        }

        if (state?.name) {
          searchParams.set('title', state.name);
        }

        if (Number(searchParams.getAll('page')) !== 0) {
          setPage(Number(searchParams.getAll('page')));
          if (page !== 0) {
            searchParams.set('page', page);
          }
        } else searchParams.set('page', page);

        setSearchParams(searchParams);
        const data = await toast.promise(fetchAllComics(searchParams), {
          pending: {
            render() {
              return <PendingToast />;
            },
            icon: false,
            toastId: toastId.pending,
          },

          error: {
            render() {
              return <ErrorToast />;
            },
            icon: false,
            toastId: toastId.error,
          },
        });
        setComics(data);
        setPrevSearchState(searchParams);
        isPageLoaded.current = true;
        setStatus('isSuccess');
        isFormDisabled(false);
        return;
      } catch (error) {
        setStatus('isError');
        setError(error);
        isFormDisabled(false);
      }
    };

    firstFetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  reload
  useEffect(() => {
    isPageLoaded.current = false;
    function handleBeforeUnload(e) {
      e.preventDefault();
      isPageLoaded.current = false;
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // pagination
  useEffect(() => {
    const fetchPage = async params => {
      setStatus('isPending');
      isFormDisabled(true);
      try {
        setPrevSearchState(params);
        const data = await fetchAllComics(params);
        setComics(data);
        setStatus('isSuccess');
        isFormDisabled(false);
      } catch (error) {
        isFormDisabled(false);
        setStatus('isError');
        setError(error);
      }
    };

    if (clicked) {
      const prevParams = getObjFromParams(searchParams);
      const newParams = { ...prevParams, page };
      setSearchParams(newParams);
      toast.promise(fetchPage(new URLSearchParams(newParams)), {
        pending: {
          render() {
            return <PendingToast />;
          },
          icon: false,
          toastId: toastId.pending,
        },
      
        error: {
          render() {
            return <ErrorToast />;
          },
          icon: false,
          toastId: toastId.error,
        },
      });

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, clicked]);

  //  search form
  useEffect(() => {
    async function fetchPage(params) {
      setStatus('isPending');
      isFormDisabled(true);
      try {
        setPrevSearchState(params);
        const data = await fetchAllComics(params);
        setComics(data);
        setStatus('isSuccess');
        isFormDisabled(false);
      } catch (error) {
        isFormDisabled(false);
        setStatus('isError');
        setError(error);
      }
    }

    if (isFormSearch > 0) {
      const prevParams = getObjFromParams(searchParams);
      const newParams = { ...prevParams, page: 0 };
      setSearchParams(newParams);
      setPage(0);
      toast.promise(fetchPage(new URLSearchParams(newParams)), {
        pending: {
          render() {
            return <PendingToast />;
          },
          icon: false,
          toastId: toastId.pending,
        },
       
        error: {
          render() {
            return <ErrorToast />;
          },
          icon: false,
          toastId: toastId.error,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormSearch]);

  //  resize
  useEffect(() => {
    if (isPageLoaded.current) {
      const prevParams = getObjFromParams(searchParams);
      const newParams = { ...prevParams, limit: cardLimit };
      setSearchParams(newParams);
      setPrevSearchState(searchParams);
      const fetchPage = async params => {
        setStatus('isPending');
        isFormDisabled(true);
        try {
          setPrevSearchState(params);
          const data = await fetchAllComics(params);
          setComics(data);
          setStatus('isSuccess');
          isFormDisabled(false);
        } catch (error) {
          isFormDisabled(false);
          setStatus('isError');
          setError(error);
        }
      };
      toast.promise(fetchPage(new URLSearchParams(newParams)), {
        pending: {
          render() {
            return <PendingToast />;
          },
          icon: false,
          toastId: toastId.pending,
        },
       

        error: {
          render() {
            return <ErrorToast />;
          },
          icon: false,
          toastId: toastId.error,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardLimit]);

  // search bar
  useEffect(() => {
    const fetchPage = async params => {
      setStatus('isFetching');
      isFormDisabled(true);
      try {
        setPrevSearchState(params);
        const data = await fetchAllComics(params);
        setComics(data);
        setStatus('isSuccess');
        isFormDisabled(false);
      } catch (error) {
        isFormDisabled(false);
        setStatus('isError');
        setError(error);
      }
    };

    if (state?.type === 'searchBar' && state?.name) {
      let newParams;
      if (prevSearchState) {
        const prevParams = getObjFromParams(prevSearchState);
        newParams = {
          ...prevParams,
          page: 0,
          title: state?.name,
          limit: cardLimit,
        };
      } else {
        newParams = { page: 0, title: state?.name, limit: cardLimit };
      }

      setSearchParams(newParams);
      setPage(0);
      toast.promise(fetchPage(new URLSearchParams(newParams)), {
        pending: {
          render() {
            return <PendingToast />;
          },
          icon: false,
          toastId: toastId.pending,
        },
      

        error: {
          render() {
            return <ErrorToast />;
          },
          icon: false,
          toastId: toastId.error,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.type]);

  // pagination
  useEffect(() => {
    if (comics) {
      setTotalPages(Math.floor(comics.total / cardLimit + 1));
      setCurrentPage(comics?.offset / cardLimit);
    }
  }, [comics, cardLimit]);

  if (status === 'isError') {
    return (
      <LoadAnimation>
        <div>Error: {error.response.data.status}</div>
        <EmptyContainerPlaceholder />
      </LoadAnimation>
    );
  } else if (status === 'isSuccess' || status === 'isPending') {
    return (
      <div className="relative">
        {status === 'isPending' && <PendingScreen />}
        <div className={css.grid}>
          {comics && comics?.results?.length > 0 && !state?.name ? (
            comics.results.map((card, i) => (
              <ComicsCard
                card={card}
                key={card.id}
                openModal={() => openModal(card.id)}
                size={'basic'}
                i={i}
              />
            ))
          ) : (
            <LoadAnimation>
              <EmptyContainerPlaceholder />
            </LoadAnimation>
          )}
        </div>
        {totalPages > 1 && (
          <PaginationComponent
            currentPage={currentPage}
            changePage={setPage}
            totalPages={totalPages}
            isClicked={setClicked}
          />
        )}
      </div>
    );
  }
};

export default CardList;
