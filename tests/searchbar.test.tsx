import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from '@/components/SearchBar';
import { renderWithProviders } from './helpers/render';

describe('SearchBar', () => {
  it('is fully controlled by the parent value', () => {
    const onChange = vi.fn();
    const { rerender } = renderWithProviders(<SearchBar value="mcp" onChange={onChange} />);
    const input = screen.getByRole('searchbox', { name: /buscar recursos/i });
    expect(input).toHaveValue('mcp');

    fireEvent.change(input, { target: { value: 'motion' } });
    expect(onChange).toHaveBeenCalledWith('motion');
    expect(input).toHaveValue('mcp');

    rerender(<SearchBar value="motion" onChange={onChange} />);
    expect(input).toHaveValue('motion');
  });

  it('exposes an accessible clear action and result count', () => {
    const onChange = vi.fn();
    renderWithProviders(<SearchBar value="icons" onChange={onChange} resultCount={7} />);
    fireEvent.click(screen.getByRole('button', { name: /limpar busca/i }));
    expect(onChange).toHaveBeenCalledWith('');
    expect(screen.getByText(/7 recursos/i)).toBeInTheDocument();
  });

  it('keeps state in sync when the URL drives the query', () => {
    function Harness() {
      const [value, setValue] = useState('');
      return (
        <>
          <button type="button" onClick={() => setValue('shadcn')}>set external</button>
          <SearchBar value={value} onChange={setValue} />
        </>
      );
    }
    renderWithProviders(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: /set external/i }));
    expect(screen.getByRole('searchbox')).toHaveValue('shadcn');
  });
});
