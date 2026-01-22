/**
 * Portfolio Preview Component
 * Renders portfolio based on selected theme
 */

import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import MinimalTheme from '../Themes/MinimalTheme';
import CreativeTheme from '../Themes/CreativeTheme';
import CorporateTheme from '../Themes/CorporateTheme';
import DarkTheme from '../Themes/DarkTheme';

const PortfolioPreview = () => {
  const { theme, portfolioData } = usePortfolio();

  const themes = {
    minimal: MinimalTheme,
    creative: CreativeTheme,
    corporate: CorporateTheme,
    dark: DarkTheme
  };

  const ThemeComponent = themes[theme] || MinimalTheme;

  return <ThemeComponent data={portfolioData} />;
};

export default PortfolioPreview;
