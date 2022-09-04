import {client} from '../../../index.js'
import { gql } from '@apollo/client';

let state= {

}



const State_Query = gql`
{
  category{
    name
     products{
        id
        name
        gallery
        description
        category
        brand
        prices{
          currency{
            
            symbol
          }
          amount
         }
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      }
     }
    }
`;