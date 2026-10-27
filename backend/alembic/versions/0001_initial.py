"""initial schema"""

from alembic import op
from app.db import Base
from app import models
from sqlalchemy import inspect

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    Base.metadata.create_all(bind=op.get_bind())


def downgrade() -> None:
    bind = op.get_bind()
    for table in reversed(inspect(bind).get_table_names()):
        op.drop_table(table)
