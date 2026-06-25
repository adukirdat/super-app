import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import CategoryCard from '../components/categories/CategoryCard';
import PageContainer from '../components/common/PageContainer';
import SectionContainer from '../components/common/SectionContainer';

const CATEGORIES = [
  { id: 1, title: 'Action', image: 'https://picsum.photos/seed/super-action/360/230', backgroundColor: '#FF5209' },
  { id: 2, title: 'Comedy', image: 'https://picsum.photos/seed/super-comedy/360/230', backgroundColor: '#7358FF' },
  { id: 3, title: 'Drama', image: 'https://picsum.photos/seed/super-drama/360/230', backgroundColor: '#D7A8FF' },
  { id: 4, title: 'Music', image: 'https://picsum.photos/seed/super-music/360/230', backgroundColor: '#E61E32' },
  { id: 5, title: 'Sports', image: 'https://picsum.photos/seed/super-sports/360/230', backgroundColor: '#6CD061' },
  { id: 6, title: 'Thriller', image: 'https://picsum.photos/seed/super-thriller/360/230', backgroundColor: '#84C2FF' },
  { id: 7, title: 'Fantasy', image: 'https://picsum.photos/seed/super-fantasy/360/230', backgroundColor: '#FF4ADE' },
  { id: 8, title: 'Romance', image: 'https://picsum.photos/seed/super-romance/360/230', backgroundColor: '#148A08' },
];

const Categories = () => {
  const navigate = useNavigate();
  const selectedCategories = useStore((state) => state.selectedCategories);
  const setSelectedCategories = useStore((state) => state.setSelectedCategories);

  const [error, setError] = useState('');

  const handleCategoryClick = (category) => {
    const isSelected = selectedCategories.some((cat) => cat.id === category.id);
    
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((cat) => cat.id !== category.id));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setError('');
  };

  const handleRemoveCategory = (e, categoryId) => {
    e.stopPropagation();
    setSelectedCategories(selectedCategories.filter((cat) => cat.id !== categoryId));
  };

  const handleContinue = () => {
    if (selectedCategories.length < 3) {
      setError('Minimum 3 category required');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <PageContainer>
      <div className="grid min-h-screen grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-20 lg:py-8">
        <SectionContainer className="flex flex-col lg:min-h-[500px]">
          <h1 className="mb-10 text-2xl font-bold text-[#72DB73]">Super app</h1>

          <h2 className="mb-6 text-[34px] font-bold leading-tight text-white lg:text-[42px]">
            Choose your
            <br />
            entertainment
            <br />
            category
          </h2>

          <div className="mb-5 flex max-w-[340px] flex-wrap gap-3">
            {selectedCategories.map((category) => (
              <div
                key={category.id}
                className="flex min-w-[118px] items-center justify-between gap-3 rounded-full bg-[#148A08] px-4 py-1.5"
              >
                <span className="text-xs font-medium text-white">{category.title}</span>
                <button
                  onClick={(e) => handleRemoveCategory(e, category.id)}
                  className="text-sm leading-none text-white/55 transition hover:text-white"
                  aria-label={`Remove ${category.title}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {error && <p className="text-xs text-[#FF3131]">⚠ {error}</p>}
        </SectionContainer>

        <SectionContainer className="mx-auto w-full max-w-[560px]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategories.some((cat) => cat.id === category.id);
              return (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  image={category.image}
                  selected={isSelected}
                  onClick={() => handleCategoryClick(category)}
                  backgroundColor={category.backgroundColor}
                />
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={selectedCategories.length < 3}
              className="rounded-full bg-[#148A08] px-7 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1fb315] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next Page
            </button>
          </div>
        </SectionContainer>
      </div>
    </PageContainer>
  );
};

export default Categories;
