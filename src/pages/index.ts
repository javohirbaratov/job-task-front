import { lazy } from "react";

export const Documents = lazy(() => import('./Documents'));
export const DocumentsShow = lazy(() => import('./DocumentShow'));
export const DocumentsCreate = lazy(() => import('./DocumentCreate'));