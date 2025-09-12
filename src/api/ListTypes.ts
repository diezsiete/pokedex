import { type TypedDocumentNode, gql } from "@apollo/client";
import type { Type } from "@api/types.ts";

type ListTypesResult = { types: Type[] }

const LIST_TYPES: TypedDocumentNode<ListTypesResult, Record<string, never>> = gql`
    query ListTypes {
        types: pokemontype(distinct_on: [type_id]) {
            type {
                name
            }
        }
    }
`;
export default LIST_TYPES;