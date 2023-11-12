.PHONY: all run-backend run-frontend


all:
	make -j 2 run-backend run-frontend


run-backend:
	if [ ! -d "backend/node_modules" ]; then cd backend && npm i ; fi
	cd backend && npm run start

run-frontend:
	if [ ! -d "frontend/node_modules" ]; then cd frontend && npm i ; fi
	cd frontend && npm run build
	cd frontend && npm run preview
