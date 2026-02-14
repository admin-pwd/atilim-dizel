import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchCSV,
  parseGeneralInfo,
  parseServices,
  parseFAQs,
  parseReviews,
  GENERAL_INFO_URL,
  SERVICES_URL,
  FAQ_URL,
  REVIEWS_URL,
  DIRECTIONS_URL,
  DEFAULT_SERVICE_IMAGE,
} from '../lib/sheets';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [generalInfo, setGeneralInfo] = useState({});
  const [services, setServices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([
      fetchCSV(GENERAL_INFO_URL).then((data) => (cancelled ? null : parseGeneralInfo(data || []))),
      fetchCSV(SERVICES_URL).then((data) => (cancelled ? [] : parseServices(data || []))),
      fetchCSV(FAQ_URL).then((data) => (cancelled ? [] : parseFAQs(data || []))),
      fetchCSV(REVIEWS_URL).then((data) => (cancelled ? [] : parseReviews(data || []))),
    ])
      .then(([info, svc, fq, rev]) => {
        if (cancelled) return;
        setGeneralInfo(info || {});
        setServices(Array.isArray(svc) ? svc : []);
        setFaqs(Array.isArray(fq) ? fq : []);
        setReviews(Array.isArray(rev) ? rev : []);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const value = {
    generalInfo,
    services,
    faqs,
    reviews,
    loading,
    error,
    directionsUrl: DIRECTIONS_URL,
    defaultServiceImage: DEFAULT_SERVICE_IMAGE,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
