import polars as pl
import os 
from dotenv import load_dotenv

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
data_dir = os.path.join(project_root, 'backend', 'data')  # Adjust if needed
file_path = os.path.join(data_dir, '20K Financial Data.csv')

def load_data():
    return pl.scan_csv(file_path, ignore_errors=True)

def generate_rating_json(data_lf):
    rating_lf = data_lf.select([
        pl.col("cs_company_id").alias("safeNumber"),
        
        pl.col("credit_score").map_elements(
            lambda x: "A" if x >= 85 else
                      "B" if 50 <= x < 85 else
                      "C" if 35 <= x < 50 else
                      "D" if 0 <= x < 35 else "E",
            return_dtype=pl.String
        ).alias("credit_score_type"),

        pl.col("credit_limit").map_elements(
            lambda x: "A" if x >= 250000 else
                      "B" if 100000 <= x < 250000 else
                      "C" if 50000 <= x < 100000 else
                      "D" if x < 50000 else "E",
            return_dtype=pl.String
        ).alias("credit_limit_type"),

        pl.col("credit_limit").map_elements(
            lambda x: "A" if x >= 250000 else
                      "B" if 100000 <= x < 250000 else
                      "C" if 50000 <= x < 100000 else
                      "D" if x < 50000 else "E",
            return_dtype=pl.String
        ).alias("turnover_type"),

        pl.col("is_active").map_elements(
            lambda x: "Active" if x else "Inactive",
            return_dtype=pl.String
        ).alias("status"),

        pl.col("country_code")
    ])
    
    return rating_lf

def generate_aggre_json(rating_lf):
    
    aggre_lf = rating_lf.group_by("country_code").agg([
        pl.col("safeNumber").count().alias("companies_count"),
        pl.col("status").filter(pl.col("status") == "Active").count().alias("active_companies_count"),
        pl.col("status").filter(pl.col("status") == "Inactive").count().alias("inactive_companies_count"),
    ]).sort("companies_count", descending=True)

    return aggre_lf
