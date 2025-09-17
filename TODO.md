# TODO: Fix TypeScript Errors in Angular Project

## Overview
Fix various TypeScript errors across multiple files in the Angular project to ensure type safety and proper compilation.

## Errors to Fix

### 1. BaseListComponent Errors (src/app/base/components/base-list-component.ts)
- TS2571: Object is of type 'unknown' - Fix DataTableService.opt type issues
- TS7006: Parameter 'res' implicitly has an 'any' type - Add proper typing
- TS2339: Property 'translate' does not exist on type 'TranslateService' - Fix translation usage
- TS2339: Property 'localize' does not exist on type 'BaseListComponent' - Fix localization property

### 2. HttpService Errors (src/app/core/services/http/http.service.ts)
- TS2552: Cannot find name 'ApResponse' - Import or define ApResponse type
- TS7006: Parameter 'error' implicitly has an 'any' type - Add proper typing

### 3. CRUD Component Errors (src/app/pages/crud/crud.ts)
- TS2307: Cannot find module '../service/product.service' - Fix import path
- NG2003: No suitable injection token for ProductService - Fix service injection
- TS7006: Parameter 'data' implicitly has an 'any' type - Add proper typing

### 4. Session Manager Errors (src/app/pages/guards/session-manager.ts)
- TS2306: File 'models.ts' is not a module - Fix import statement

### 5. Styles Errors (src/styles.css)
- Could not resolve font path - Fix font import paths

## Implementation Steps

### Step 1: Fix BaseListComponent
- [ ] Update DataTableService interface to have proper types for opt
- [ ] Add type annotations for parameters in subscribe callbacks
- [ ] Fix TranslateService usage (use instant() directly)
- [ ] Add localize property or fix its usage

### Step 2: Fix HttpService
- [ ] Import ApResponse from correct path
- [ ] Add type annotations for error parameters

### Step 3: Fix CRUD Component
- [ ] Correct import path for ProductService
- [ ] Ensure ProductService is properly provided
- [ ] Add type annotations for data parameters

### Step 4: Fix Session Manager
- [ ] Fix import statement for models.ts

### Step 5: Fix Styles
- [ ] Update font paths to correct locations

### Step 6: Testing
- [ ] Run TypeScript compilation to verify all errors are resolved
- [ ] Test application functionality to ensure no runtime issues

## Dependent Files
- src/app/base/components/base-list-component.ts
- src/app/core/services/http/http.service.ts
- src/app/pages/crud/crud.ts
- src/app/pages/guards/session-manager.ts
- src/styles.css
- src/app/shared/interfaces.ts (for DataTableService updates)

## Notes
- Ensure all changes maintain backward compatibility
- Test thoroughly after each fix
- Update interfaces if necessary for better type safety
