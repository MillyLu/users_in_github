import React from 'react';
import axios from 'axios';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Main } from '../pages/main';
import { Search } from '../components/search/search';
import { FilterButton } from '../components/filter/filterButton';



jest.mock('axios');


describe('Search', () => {
  test('calls setLogin function with entered name', () => {
    const setLogin = jest.fn();
    render(<Search setLogin={setLogin} />);
    const searchInput = screen.getByTestId('input');
    const searchButton = screen.getByTestId('button');
    fireEvent.change(searchInput, { target: { value: 'testName' } });
    fireEvent.click(searchButton);
    expect(setLogin).toHaveBeenCalledWith('testName');
  });
});




describe('<Main />', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  test('should search for users when form is submitted', async () => {
    const getUserByLogin = jest.fn();
    axios.get.mockResolvedValueOnce({
      data: {
        total_count: 1,
        items: [
          { id: 1, login: 'user1' },
        ]
      }
    });

    render(<Main />);
    const searchInput = screen.getByTestId('input');
    const searchButton = screen.getByTestId('button');
    fireEvent.change(searchInput, { target: { value: 'testName' } });
    fireEvent.click(searchButton);
   
    await waitFor(() =>getUserByLogin());

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('https://api.github.com/search/users?q=testName'));

    expect(screen.getByText(/user1/i)).toBeInTheDocument();
  });
});


describe('<FilterButton />', () => {
  describe('Attributes tests', () => {
      it('should set type="input" by default', () => {
          render(<FilterButton />);
          const exampleInput = screen.getByLabelText('От большего к меньшему');
          expect(exampleInput).toBeInTheDocument();
      }); 
  })
  describe("Callbacks tests", () => {
      it("should call 'onClick' prop", () => {


              const mockSetter = jest.fn();

  render(<FilterButton  setSort={mockSetter} />);

  const exampleInput1 = screen.getByLabelText('От меньшего к большему');

  fireEvent.click(exampleInput1)
            

            
              expect(mockSetter).toHaveBeenCalledWith("asc");
            })
      });
   });




