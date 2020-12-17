import React from 'react';
import '../scss/PageIndex.scss';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

interface Props {
  dispatch: any;
}

export default function PageIndex({ dispatch }: Props) {
  function previousPage() {
    dispatch({ type: 'PREVIOUS_PAGE' });
  }

  function nextPage() {
    dispatch({ type: 'NEXT_PAGE' });
  }

  return (
    <div className="pageIndex">
      <IoIosArrowBack className="pageButton backButton" onClick={() => previousPage()} />
      <IoIosArrowForward className="pageButton forwardButton" onClick={() => nextPage()} />
    </div>
  );
}
