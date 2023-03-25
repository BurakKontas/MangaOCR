import React from 'react';
import { Upload } from './Components/Upload';

export interface AppRoute {
    path?: string;
    element: JSX.Element;
    children?: undefined | React.ReactNode;
    caseSensitive?: boolean;
    index?: boolean;
    key?: string;
}

const AppRoutes: AppRoute[] = [
    {
        index: true,
        element: <Upload />
    },
];

export default AppRoutes;