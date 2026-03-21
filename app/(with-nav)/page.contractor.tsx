'use client';

import getCourseName from '@/lib/getCourseName';
import getCourses from '@/lib/readCoursesNames';
import { courseType } from '@/types/types';
import { useEffect, useMemo, useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';
import './page.contractor.css';

export default function ContractorPage() {
	const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);
	const [availableCourses, setAvailableCourses] = useState<courseType[]>([]);
	const [isCoursesLoaded, setIsCoursesLoaded] = useState(false);
	const [students, setStudents] = useState<
		{
			name: string;
			email: string;
			description: string;
			profileImage: string;
			linkedin?: string;
			github?: string;
			certificates: string[];
		}[]
	>([]);
	const [isStudentsLoading, setIsStudentsLoading] = useState(true);
	const [studentsError, setStudentsError] = useState('');

	useEffect(() => {
		getCourses(setAvailableCourses, setIsCoursesLoaded);
	}, []);

	useEffect(() => {
		const loadStudents = async () => {
			setIsStudentsLoading(true);
			setStudentsError('');

			try {
				const res = await fetch('/api/users');
				if (!res.ok) {
					throw new Error('Não foi possível carregar os alunos.');
				}

				const data = await res.json();
				const mappedStudents = (data.students || []).map((student: any) => ({
					name: student.name || 'Sem nome',
					email: student.email || 'Sem e-mail',
					description: student.bio || 'Sem descrição.',
					profileImage: student.image || 'https://www.gravatar.com/avatar/0?d=mp&f=y',
					linkedin: student.linkedin || '',
					github: student.github || '',
					certificates: Array.isArray(student.certificates) ? student.certificates : [],
				}));

				setStudents(mappedStudents);
			} catch (error) {
				setStudentsError(error instanceof Error ? error.message : 'Erro ao buscar alunos.');
			} finally {
				setIsStudentsLoading(false);
			}
		};

		loadStudents();
	}, []);

	const normalizeCertificateName = (value: string) => value.trim().toLowerCase();
	const courseToCertificateSlug = (courseName: string) => normalizeCertificateName(getCourseName(courseName));

	const sortedCourses = useMemo(() => {
		return [...availableCourses].sort((firstCourse, secondCourse) => {
			if (firstCourse.disponivel !== secondCourse.disponivel) {
				return firstCourse.disponivel ? -1 : 1;
			}

			return firstCourse.nome.localeCompare(secondCourse.nome, 'pt-BR');
		});
	}, [availableCourses]);

	const filteredStudents = useMemo(() => {
		if (selectedCertificates.length === 0) return students;
		const selectedNormalized = selectedCertificates.map(normalizeCertificateName);
		return students.filter(student =>
			student.certificates.some(cert => selectedNormalized.includes(normalizeCertificateName(cert))),
		);
	}, [selectedCertificates, students]);

	return (
		<main className="contractorPage">
			<h1>Encontrar Alunos</h1>
			<div className="contractorFilters">
				<span>Certificados de interesse:</span>
				<div className="contractorCertificates">
					{isCoursesLoaded && sortedCourses.length > 0 ? (
						sortedCourses.map(course => {
							const courseSlug = courseToCertificateSlug(course.nome);
							if (!course.disponivel) {
								return (
									<button key={course.nome} type="button" className="certificateDisabledBtn" disabled>
										{course.nome}
									</button>
								);
							}

							return (
								<label key={course.nome} className="certificateItem">
									<input
										type="checkbox"
										checked={selectedCertificates.includes(courseSlug)}
										onChange={e => {
											if (e.target.checked) {
												setSelectedCertificates([...selectedCertificates, courseSlug]);
											} else {
												setSelectedCertificates(
													selectedCertificates.filter(c => c !== courseSlug),
												);
											}
										}}
									/>
									{course.nome}
								</label>
							);
						})
					) : (
						<p className="contractorEmpty">Carregando cursos disponíveis...</p>
					)}
				</div>
			</div>

			<section className="contractorStudents">
				<h2>Alunos encontrados</h2>
				{isStudentsLoading && <p className="contractorEmpty">Carregando alunos...</p>}
				{studentsError && <p className="contractorEmpty">{studentsError}</p>}
				<ul>
					{!isStudentsLoading &&
						!studentsError &&
						filteredStudents.map(student => (
							<li key={student.email}>
								<div className="studentCardTop">
									<img src={student.profileImage} alt={`${student.name}`} />
									<div className="studentIdentity">
										<strong>{student.name}</strong>
										<span>{student.email}</span>
									</div>
									<div className="studentActions">
										{student.linkedin && (
											<a
												href={student.linkedin}
												target="_blank"
												rel="noreferrer"
												aria-label="LinkedIn"
											>
												<FaLinkedinIn />
											</a>
										)}
										{student.github && (
											<a
												href={student.github}
												target="_blank"
												rel="noreferrer"
												aria-label="GitHub"
											>
												<FiGithub />
											</a>
										)}
									</div>
								</div>
								<p className="studentDescription">{student.description}</p>
								<div className="studentCertificates">
									{student.certificates.map(certificate => (
										<span key={`${student.email}-${certificate}`}>
											{certificate === 'logica' ? 'Tenda' : certificate}
										</span>
									))}
								</div>
							</li>
						))}
				</ul>
				{!isStudentsLoading && !studentsError && filteredStudents.length === 0 && (
					<p className="contractorEmpty">Nenhum aluno encontrado.</p>
				)}
			</section>
		</main>
	);
}
