import useForm from '../lib/useForm';

export default function SellPage() {
  const { inputs, onChangeHandler, resetForm, clearForm } = useForm({
    name: 'KyawKhaing',
    price: 12345,
  });
  return (
    <div>
      <p>Sell your project!</p>
      <form>
        <label htmlFor="name">name</label>
        <input id="name" name="name" type="text" value={inputs.name} onChange={onChangeHandler} />
        <label htmlFor="price">price</label>
        <input id="price" name="price" type="number" value={inputs.price} onChange={onChangeHandler} />
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
      </form>
    </div>
  );
}
