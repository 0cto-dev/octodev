'use client';

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

	const studentsMock = [
		{
			name: 'Maria Silva',
			email: 'maria@email.com',
			description: 'Desenvolvedora full stack focada em Python e lógica aplicada a produtos digitais.',
			profileImage: 'https://i.pravatar.cc/150?img=47',
			linkedin: 'https://www.linkedin.com/in/mariasilva',
			github: 'https://github.com/mariasilva',
			certificates: ['python', 'tenda'],
		},
		{
			name: 'João Souza',
			email: 'joao@email.com',
			description: 'Frontend com foco em JavaScript moderno e construção de interfaces escaláveis.',
			profileImage: 'https://i.pravatar.cc/150?img=12',
			linkedin: 'https://www.linkedin.com/in/joaosouza',
			certificates: ['javascript'],
		},
		{
			name: 'Jorge Fuller',
			email: 'jorge@email.com',
			description: 'Back-end com experiência em Python e APIs orientadas a performance.',
			profileImage: 'https://i.pravatar.cc/150?img=61',
			github: 'https://github.com/jorgefuller',
			certificates: ['python'],
		},
		{
			name: 'Vera Black',
			email: 'vera@email.com',
			description: 'Engenheira de software com foco em Rust e programação de baixo nível.',
			profileImage: 'https://i.pravatar.cc/150?img=5',
			linkedin: 'https://www.linkedin.com/in/verablack',
			github: 'https://github.com/verablack',
			certificates: ['rust', 'c', 'c++'],
		},
		{
			name: 'Elnora Young',
			email: 'elnora@email.com',
			description: 'Generalista em lógica, JavaScript e Python, com perfil colaborativo.',
			profileImage: 'https://i.pravatar.cc/150?img=32',
			linkedin: 'https://www.linkedin.com/in/elnorayoung',
			certificates: ['tenda', 'javascript', 'python'],
		},
		{
			name: 'Lucile Adams',
			email: 'lucile@email.com',
			description: 'Desenvolvedora com base sólida em C# e PHP para sistemas corporativos.',
			profileImage: 'https://i.pravatar.cc/150?img=24',
			github: 'https://github.com/lucileadams',
			certificates: ['c#', 'php'],
		},
		{
			name: 'Bill Williamson',
			email: 'bill@email.com',
			description: 'Atua com bancos de dados MySQL e resolução de problemas com lógica.',
			profileImage: 'https://i.pravatar.cc/150?img=19',
			linkedin: 'https://www.linkedin.com/in/billwilliamson',
			certificates: ['mysql', 'tenda'],
		},
		{
			name: 'Steve Glover',
			email: 'steve@email.com',
			description: 'Full stack com foco em JavaScript, Python e arquitetura modular.',
			profileImage: 'https://i.pravatar.cc/150?img=68',
			linkedin: 'https://www.linkedin.com/in/steveglover',
			github: 'https://github.com/steveglover',
			certificates: ['javascript', 'python', 'c++'],
		},
	];

	useEffect(() => {
		getCourses(setAvailableCourses, setIsCoursesLoaded);
	}, []);

	const normalizeCertificateName = (value: string) => value.trim().toLowerCase();

	const sortedCourses = useMemo(() => {
		return [...availableCourses].sort((firstCourse, secondCourse) => {
			if (firstCourse.disponivel !== secondCourse.disponivel) {
				return firstCourse.disponivel ? -1 : 1;
			}

			return firstCourse.nome.localeCompare(secondCourse.nome, 'pt-BR');
		});
	}, [availableCourses]);

	const filteredStudents = useMemo(() => {
		if (selectedCertificates.length === 0) return studentsMock;
		const selectedNormalized = selectedCertificates.map(normalizeCertificateName);
		return studentsMock.filter(student =>
			student.certificates.some(cert => selectedNormalized.includes(normalizeCertificateName(cert))),
		);
	}, [selectedCertificates]);

	return (
		<main className="contractorPage">
			<h1>Encontrar Alunos</h1>
			<div className="contractorFilters">
				<span>Certificados de interesse:</span>
				<div className="contractorCertificates">
					{isCoursesLoaded && sortedCourses.length > 0 ? (
						sortedCourses.map(course => {
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
										checked={selectedCertificates.includes(course.nome)}
										onChange={e => {
											if (e.target.checked) {
												setSelectedCertificates([...selectedCertificates, course.nome]);
											} else {
												setSelectedCertificates(
													selectedCertificates.filter(c => c !== course.nome),
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
				<ul>
					{filteredStudents.map(student => (
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
										<a href={student.github} target="_blank" rel="noreferrer" aria-label="GitHub">
											<FiGithub />
										</a>
									)}
								</div>
							</div>
							<p className="studentDescription">{student.description}</p>
							<div className="studentCertificates">
								{student.certificates.map(certificate => (
									<span key={`${student.email}-${certificate}`}>{certificate}</span>
								))}
							</div>
						</li>
					))}
				</ul>
				{filteredStudents.length === 0 && <p className="contractorEmpty">Nenhum aluno encontrado.</p>}
			</section>
		</main>
	);
}
