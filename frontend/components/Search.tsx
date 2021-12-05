import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { SEARCH_QUERY } from '../GraphQL/query/search';
import { ProductType } from '../Type/ProductType';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

export function Search() {
  const router = useRouter();
  const [findItems, { loading, data }] = useLazyQuery<{ SearchTerms: ProductType[] }>(SEARCH_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const items = data?.SearchTerms || [];
  const debouncedFindItems = debounce(findItems, 350);
  resetIdCounter();

  const { inputValue, isOpen, getMenuProps, getInputProps, getComboboxProps, getItemProps, highlightedIndex } =
    useCombobox({
      items,
      onInputValueChange() {
        debouncedFindItems({
          variables: {
            searchTerm: inputValue,
          },
        });
      },
      onSelectedItemChange({ selectedItem }) {
        if (selectedItem) {
          router.push({
            pathname: `/product/${selectedItem.id}`,
          });
        }
      },
      itemToString: (item) => item?.name || '',
    });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'text',
            placeholder: 'Search for an item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem key={item.id} {...getItemProps({ item, index })} highlighted={index === highlightedIndex}>
              <img src={item.photo.image.publicUrlTransformed} alt={item.name} width="50" />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && <DropDownItem>Sorry, No Items found for {inputValue}</DropDownItem>}
      </DropDown>
    </SearchStyles>
  );
}
