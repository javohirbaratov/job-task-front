import { document_api } from "../../constants/api";
import { IApiRes } from "../../types/api";
import { api } from "./api";

export interface IDocument {
  id: number,
  created_at: string,
  document_name: string,
  configuration_count: number
}

// index
interface IDocumentRes extends IApiRes {
  data: IDocument[];
}
// show
interface IDocumentByIdRes extends IApiRes {
  data: {
    id: number,
    field_seq: number,
    is_mandatory: number,
    field_type: number,
    field_name: string,
    document_id: number,
    select_values: string
  };
}

interface ISelectValues {
  value: boolean,
  label: string
}

export interface IFormValues {
  field_seq: number,
  is_mandatory: boolean,
  field_type: number,
  field_name: string,
  select_values: string
}

// post
export interface IDocumentAdd {
  document_name: string,
  form_values: IFormValues[]
}

const document_tag = "document_tag";

export const productApi = api
  .enhanceEndpoints({ addTagTypes: [document_tag] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getDocument: build.query<IDocumentRes, void>({
        query: () => document_api.list,
        providesTags: [document_tag],
      }),
      // show
      // getAdminProductById: build.query<IProductByIdRes, {productId: string|null}>({
      //   query: ({productId}) => document_api.product_get_by_id(productId),
      //   providesTags: [admin_product_tag],
      // }),
      // post
      addDocument: build.mutation<IApiRes, IDocumentAdd>({
        query: (body) => ({
          url: document_api.create,
          method: "POST",
          body,
        }),
        invalidatesTags: [document_tag],
      }),
    }),
  });

export const {
  useGetDocumentQuery,
  useAddDocumentMutation
  // useGetAdminProductByIdQuery,
} = productApi;

export const {
  endpoints: {
    getDocument,
    addDocument
    // getAdminProductById,
  },
} = productApi;
