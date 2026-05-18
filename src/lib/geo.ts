import { CITIES, type City } from "@/data/cities";
import { DEPARTMENTS, type Department } from "@/data/departments";
import { REGIONS, type Region } from "@/data/regions";

export function getCitiesByDepartment(deptCode: string): City[] {
  return CITIES.filter((c) => c.department.code === deptCode);
}

export function getCitiesByRegion(regionSlug: string): City[] {
  const region = REGIONS.find((r) => r.slug === regionSlug);
  if (!region) return [];
  return CITIES.filter((c) => region.departments.includes(c.department.code));
}

export function getDepartmentsByRegionSlug(regionSlug: string): Department[] {
  return DEPARTMENTS.filter((d) => d.region === regionSlug);
}

export function getRegionForDepartment(deptCode: string): Region | undefined {
  const dept = DEPARTMENTS.find((d) => d.code === deptCode);
  if (!dept) return undefined;
  return REGIONS.find((r) => r.slug === dept.region);
}

export function getNeighboringDepartments(deptCode: string): Department[] {
  const region = getRegionForDepartment(deptCode);
  if (!region) return [];
  return DEPARTMENTS.filter((d) => d.region === region.slug && d.code !== deptCode);
}
