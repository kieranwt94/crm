import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { Spinner } from 'reactstrap';

import s from './spinner.module.scss';

export default () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <div className={s.spinner}>
            <Spinner color="light" style={{ width: '3rem', height: '3rem' }} />
        </div>
    );
}