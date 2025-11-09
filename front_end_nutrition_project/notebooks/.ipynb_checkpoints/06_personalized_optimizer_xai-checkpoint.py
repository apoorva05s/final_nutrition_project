#!/usr/bin/env python
# coding: utf-8

# In[2]:


#get_ipython().system('pip install numpy==2.1.3 --force-reinstall')


# In[2]:


#get_ipython().system('pip install --upgrade --force-reinstall shap')


# In[2]:


import os
import pandas as pd
import numpy as np
import streamlit as st
import joblib
import shap
import matplotlib.pyplot as plt
import warnings
from pathlib import Path
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import MinMaxScaler
from sklearn.inspection import permutation_importance

warnings.filterwarnings("ignore")

# ============================================================
# 📁 PATH CONFIGURATION
# ============================================================
# works in both Jupyter and normal script
try:
    BASE_DIR = Path(__file__).resolve().parent
except NameError:
    BASE_DIR = Path.cwd()

DATA_DIR = Path(r"D:\Complete_Data\ml_part_nutrition_project\processed_data")
MODELS_DIR = BASE_DIR / "models"
MODELS_DIR.mkdir(exist_ok=True)

# ============================================================
# 🧩 LOAD DATASET
# ============================================================
st.title("🌿 Personalized Recipe Optimizer with Explainable AI (XAI)")

csv_path = DATA_DIR / "personalized_nsga2_results.csv"
if not csv_path.exists():
    st.error(f"❌ CSV file not found at: {csv_path}")
    st.info("Please run the NSGA-II optimizer script first to generate this file.")
    st.stop()

st.markdown("📥 **Loading processed dataset...**")
df = pd.read_csv(csv_path)
st.success(f"✅ Loaded {df.shape[0]} recipes with {df.shape[1]} columns")

# ============================================================
# 🧮 FEATURE PREPARATION
# ============================================================
numeric_cols = df.select_dtypes(include=np.number).columns.tolist()
if not numeric_cols:
    st.error("No numeric columns found in dataset.")
    st.stop()

st.write("📊 **Numeric Features:**", numeric_cols)

# Add preference score if missing
if "_preference_score" not in df.columns:
    df["_preference_score"] = (
        df[numeric_cols].sum(axis=1) / len(numeric_cols)
    ) + np.random.normal(0, 0.01, size=len(df))

# ============================================================
# 🧠 MODEL TRAINING / LOADING
# ============================================================
@st.cache_resource
def get_model_and_scaler(df):
    model_path = MODELS_DIR / "personalized_rf_model.joblib"
    scaler_path = MODELS_DIR / "personalized_scaler.joblib"

    if model_path.exists() and scaler_path.exists():
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        st.success("✅ Loaded existing model and scaler.")
        return model, scaler

    st.warning("⚠️ No saved model found — training new Random Forest model...")
    X = df[numeric_cols].fillna(df[numeric_cols].mean())
    y = df["_preference_score"]

    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)

    model = RandomForestRegressor(n_estimators=200, random_state=42)
    model.fit(X_scaled, y)

    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    st.success("✅ Model trained and saved successfully.")
    return model, scaler


model, scaler = get_model_and_scaler(df)

# ============================================================
# 🧠 FEATURE IMPORTANCE (XAI)
# ============================================================
@st.cache_data
def compute_feature_importance(_model, df):
    """Compute permutation feature importance for explainability."""
    X = df[numeric_cols].fillna(df[numeric_cols].mean())
    y = df["_preference_score"]
    X_scaled = MinMaxScaler().fit_transform(X)

    result = permutation_importance(
        _model, X_scaled, y, n_repeats=10, random_state=42, n_jobs=-1
    )

    importance_df = pd.DataFrame({
        "Feature": numeric_cols,
        "Importance": result.importances_mean
    }).sort_values("Importance", ascending=False)

    return importance_df


importance_df = compute_feature_importance(model, df)

st.markdown("### 🔍 Model Feature Importance")
st.bar_chart(importance_df.set_index("Feature")["Importance"])

# ============================================================
# 🌿 SHAP EXPLAINABILITY
# ============================================================
try:
    explainer = shap.TreeExplainer(model)
    sample_data = df[numeric_cols].fillna(df[numeric_cols].mean()).sample(min(100, len(df)), random_state=42)
    shap_values = explainer.shap_values(sample_data)

    st.markdown("### 🧠 SHAP Summary Plot")
    fig, ax = plt.subplots()
    shap.summary_plot(shap_values, sample_data, plot_type="bar", show=False)
    st.pyplot(fig)
except Exception as e:
    st.warning(f"⚠️ SHAP visualization unavailable: {e}")

# ============================================================
# 🍽️ RECIPE INTERACTIVE VIEW
# ============================================================
st.markdown("### 🍽️ Explore Pareto-Optimal Recipes")

recipe_idx = st.slider("Select a recipe index", 0, len(df) - 1, 0)
sel_row = df.iloc[recipe_idx]

st.write("### 📋 Recipe Details")

# ✅ FIX: remove duplicate columns before showing
display_cols = list(dict.fromkeys(
    [c for c in ["recipe_id", "recipe_title"] if c in df.columns] + numeric_cols[:6] + ["_preference_score"]
))
st.table(pd.DataFrame(sel_row[display_cols]).T)

# ============================================================
# 🧾 Natural Language Explanation
# ============================================================
st.markdown("### 💬 Explainable Summary")

top_feature = importance_df.iloc[0]["Feature"]
top_impact = round(importance_df.iloc[0]["Importance"], 3)
summary_text = (
    f"The model identified **{top_feature}** as the most influential feature "
    f"with an importance score of **{top_impact}**. This means recipes with optimal "
    f"values for {top_feature} strongly affect your personalized health and sustainability score."
)

st.info(summary_text)

st.markdown("---")
st.markdown("✅ **XAI Dashboard Ready — Model, Optimization, and Explainability Integrated.**")


# In[5]:


#import os

#for root, dirs, files in os.walk(r"D:\Complete_Data\ml_part_nutrition_project"):
#    for f in files:
#        if "personalized_nsga2_results.csv" in f:
#            print(os.path.join(root, f))

