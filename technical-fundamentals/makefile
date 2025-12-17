VENV_NAME = venv
PYTHON = python3
REQUIREMENTS = requirements.txt

.PHONY: all venv install test clean

all: venv install test

venv:
	@if [ ! -d "$(VENV_NAME)" ]; then \
		$(PYTHON) -m venv $(VENV_NAME); \
		echo "Virtual environment created."; \
	else \
		echo "Virtual environment already exists."; \
	fi

install: venv
	@if [ -f "$(REQUIREMENTS)" ]; then \
		$(VENV_NAME)/bin/pip install -r $(REQUIREMENTS); \
		echo "Requirements installed."; \
	else \
		echo "No requirements.txt found. Skipping install."; \
	fi

test: venv
	$(VENV_NAME)/bin/python -m unittest $(PWD)/coding/problems/__tests__/strings/*.py -v

clean:
	rm -rf $(VENV_NAME)
	echo "Virtual environment removed."
