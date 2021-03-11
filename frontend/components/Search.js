import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($text: String!) {
    searchResults: allProducts(
      where: {
        OR: [{ name_contains_i: $text }, { description_contains_i: $text }]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function Search() {
  const router = useRouter();
  resetIdCounter();

  const [search, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  console.log(data);

  const delaySearch = debounce(search, 300);

  const items = data?.searchResults || [];

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    getComboboxProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange({ inputValue }) {
      console.log('chnage');
      if (inputValue && inputValue.length > 3) {
        delaySearch({
          variables: {
            text: inputValue,
          },
        });
      }
    },
    onSelectedItemChange({ selectedItem }) {
      console.log('selected');
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => (item ? item.name : ''),
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search....',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
        <DropDown {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <DropDownItem
                key={item.id}
                highlighted={index === highlightedIndex}
                {...getItemProps({ index, item })}
              >
                <img
                  src={item.photo.image.publicUrlTransformed}
                  alt={item.name}
                  width="50"
                />
                {item.name}
              </DropDownItem>
            ))}
          {isOpen && items.length === 0 && !loading && (
            <DropDownItem>No results....</DropDownItem>
          )}
        </DropDown>
      </div>
    </SearchStyles>
  );
}

export default Search;
